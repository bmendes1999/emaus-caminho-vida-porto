require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const { createClient } = require("@supabase/supabase-js");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

const NEWS_URL =
  "https://www.emmaus-international.org/en/news/";

/* ============================================ */
/* SUPABASE */
/* ============================================ */

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);

/* ============================================ */
/* CACHE DE TRADUÇÕES EM MEMÓRIA */
/* ============================================ */

const traducoesCache = new Map();

/* ============================================ */
/* DIVIDIR TEXTO EM PARTES PEQUENAS */
/* MyMemory: máximo aproximado de 500 bytes */
/* ============================================ */

function dividirTexto(texto, maxBytes = 450) {
  const palavras = texto.split(" ");
  const partes = [];
  let atual = "";

  for (const palavra of palavras) {
    const candidato = atual
      ? `${atual} ${palavra}`
      : palavra;

    if (
      Buffer.byteLength(candidato, "utf8") > maxBytes
    ) {
      if (atual) {
        partes.push(atual);
      }

      atual = palavra;
    } else {
      atual = candidato;
    }
  }

  if (atual) {
    partes.push(atual);
  }

  return partes;
}

/* ============================================ */
/* TRADUZIR TEXTO CURTO */
/* ============================================ */

async function traduzirTexto(texto) {
  if (!texto) {
    return "";
  }

  const textoOriginal = texto.trim();

  if (!textoOriginal) {
    return "";
  }

  /* Cache em memória */

  if (traducoesCache.has(textoOriginal)) {
    return traducoesCache.get(textoOriginal);
  }

  try {
    const params = {
      q: textoOriginal,
      langpair: "en|pt-PT",
    };

    if (process.env.MYMEMORY_EMAIL) {
      params.de = process.env.MYMEMORY_EMAIL;
    }

    const response = await axios.get(
      "https://api.mymemory.translated.net/get",
      {
        params,
      }
    );

    const traducao =
      response.data?.responseData?.translatedText;

    const detalhes =
      response.data?.responseDetails || "";

    if (
      !traducao ||
      /MYMEMORY WARNING|QUERY LENGTH LIMIT|QUOTA/i.test(
        String(traducao)
      ) ||
      /QUOTA|LIMIT/i.test(String(detalhes))
    ) {
      console.error(
        "MyMemory não conseguiu traduzir:",
        detalhes
      );

      return textoOriginal;
    }

    traducoesCache.set(
      textoOriginal,
      traducao
    );

    return traducao;
  } catch (error) {
    console.error(
      "Erro na tradução:",
      error.message
    );

    return textoOriginal;
  }
}

/* ============================================ */
/* TRADUZIR TEXTO GRANDE */
/* ============================================ */

async function traduzirTextoLongo(texto) {
  if (!texto) {
    return [];
  }

  const paragrafos = texto
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const resultado = [];

  for (const paragrafo of paragrafos) {
    const partes = dividirTexto(paragrafo);

    const partesTraduzidas = [];

    for (const parte of partes) {
      const traduzido =
        await traduzirTexto(parte);

      partesTraduzidas.push(traduzido);
    }

    resultado.push(
      partesTraduzidas.join(" ")
    );
  }

  return resultado;
}

/* ============================================ */
/* SUPABASE - OBTER NOTÍCIA GUARDADA */
/* ============================================ */

async function obterNoticiaGuardada(url) {
  try {
    const { data, error } = await supabase
      .from("noticias")
      .select("*")
      .eq("url", url)
      .maybeSingle();

    if (error) {
      console.error(
        "Erro ao consultar Supabase:",
        error.message
      );

      return null;
    }

    return data;
  } catch (error) {
    console.error(
      "Erro ao consultar Supabase:",
      error.message
    );

    return null;
  }
}

/* ============================================ */
/* SUPABASE - GUARDAR NOTÍCIA */
/* ============================================ */

async function guardarNoticia(noticia) {
  try {
    const { error } = await supabase
      .from("noticias")
      .upsert(
        noticia,
        {
          onConflict: "url",
        }
      );

    if (error) {
      console.error(
        "Erro ao guardar notícia no Supabase:",
        error.message
      );

      return false;
    }

    return true;
  } catch (error) {
    console.error(
      "Erro ao guardar notícia no Supabase:",
      error.message
    );

    return false;
  }
}

/* ============================================ */
/* OBTER RESUMO */
/* ============================================ */

async function obterResumo(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(response.data);

    const seletores = [
      ".entry-content p",
      ".post-content p",
      ".single-post-content p",
      "article p",
      "main p",
    ];

    let paragrafos = [];

    for (const seletor of seletores) {
      paragrafos = $(seletor)
        .map((i, el) =>
          $(el).text().trim()
        )
        .get()
        .filter(
          (texto) => texto.length > 40
        );

      if (paragrafos.length > 0) {
        break;
      }
    }

    if (paragrafos.length === 0) {
      return "";
    }

    const texto = paragrafos.join(" ");

    return texto.length > 300
      ? texto.substring(0, 300) + "..."
      : texto;
  } catch (error) {
    console.error(
      `Erro ao obter resumo de ${url}:`,
      error.message
    );

    return "";
  }
}

/* ============================================ */
/* LISTA DE NOTÍCIAS */
/* ============================================ */


async function obterNoticiasGuardadas() {
  const { data, error } = await supabase
    .from("noticias")
    .select("*")
    .order("criado_em", { ascending: false })
    .limit(3);

  if (error) {
    console.error(
      "Erro ao obter notícias guardadas:",
      error.message
    );
    return [];
  }

  return data || [];
}


async function atualizarNoticias() {
  try {
    const response = await axios.get(NEWS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(response.data);

    const noticiasEncontradas = [];
    const urlsEncontrados = new Set();

    const links = $("a[href]").toArray();

    for (const element of links) {
      const link = $(element);
      const href = link.attr("href");

      if (!href) continue;

      const url = new URL(href, NEWS_URL).href;

      if (
        !url.includes("/en/news/") ||
        url.includes("#") ||
        url === NEWS_URL ||
        url.endsWith("/en/news/")
      ) {
        continue;
      }

      if (urlsEncontrados.has(url)) continue;

      const parent = link.closest("article");

      const imagem = parent.length
        ? parent.find("img").first().attr("src") ||
          parent.find("img").first().attr("data-src") ||
          parent.find("img").first().attr("data-lazy-src") ||
          ""
        : link.find("img").first().attr("src") || "";

      if (!imagem) continue;

      let titulo = "";

      if (parent.length) {
        titulo =
          parent.find("h2").first().text().trim() ||
          parent.find("h3").first().text().trim() ||
          parent.find("h4").first().text().trim();
      }

      if (!titulo) {
        titulo = link.text().trim();
      }

      if (!titulo || titulo.length < 10) continue;

      const textoCard = parent.length
        ? parent.text().replace(/\s+/g, " ").trim()
        : link.parent().text().replace(/\s+/g, " ").trim();

      const dataMatch = textoCard.match(
        /\b\d{2}\.\d{2}\.\d{4}\b/
      );

      const data = dataMatch ? dataMatch[0] : "";

      noticiasEncontradas.push({
        url,
        titulo,
        data,
        imagem: new URL(imagem, NEWS_URL).href,
      });

      urlsEncontrados.add(url);

      if (noticiasEncontradas.length >= 3) {
        break;
      }
    }

    for (const noticia of noticiasEncontradas) {
      const guardada = await obterNoticiaGuardada(
        noticia.url
      );

      // Já existe → não traduz novamente
      if (
        guardada &&
        guardada.titulo_pt &&
        guardada.resumo_pt !== null
      ) {
        continue;
      }

      console.log(
        "Nova notícia encontrada:",
        noticia.url
      );

      const resumo = await obterResumo(noticia.url);

      const tituloTraduzido =
        await traduzirTexto(noticia.titulo);

      const resumoTraduzido =
        await traduzirTexto(resumo);

      await guardarNoticia({
        url: noticia.url,
        titulo_original: noticia.titulo,
        titulo_pt: tituloTraduzido,
        data: noticia.data,
        imagem: noticia.imagem,
        resumo_original: resumo,
        resumo_pt: resumoTraduzido,
        conteudo_original: null,
        conteudo_pt: null,
      });

      console.log(
        "Notícia guardada:",
        noticia.url
      );
    }
  } catch (error) {
    console.error(
      "Erro ao atualizar notícias:",
      error.message
    );
  }
}

app.get("/api/noticias", async (req, res) => {
  try {
    // Primeiro tenta obter o que já está guardado
    const noticiasGuardadas = await obterNoticiasGuardadas();

    if (noticiasGuardadas.length > 0) {
      // Responde imediatamente
      res.json(
        noticiasGuardadas.map((noticia) => ({
          titulo: noticia.titulo_pt,
          data: noticia.data,
          imagem: noticia.imagem,
          resumo: noticia.resumo_pt,
          link: noticia.url,
        }))
      );

      // Depois verifica notícias novas sem bloquear a resposta
      atualizarNoticias();

      return;
    }

    // Se ainda não houver nada no Supabase,
    // faz a primeira atualização normalmente
    await atualizarNoticias();

    const noticiasAtualizadas =
      await obterNoticiasGuardadas();

    res.json(
      noticiasAtualizadas.map((noticia) => ({
        titulo: noticia.titulo_pt,
        data: noticia.data,
        imagem: noticia.imagem,
        resumo: noticia.resumo_pt,
        link: noticia.url,
      }))
    );
  } catch (error) {
    console.error(
      "Erro ao obter notícias:",
      error.message
    );

    res.status(500).json({
      erro: "Não foi possível obter as notícias.",
    });
  }
});

/* ============================================ */
/* NOTÍCIA COMPLETA */
/* ============================================ */

app.get("/api/noticia", async (req, res) => {
  try {
    const urlRecebido =
      req.query.url;

    if (!urlRecebido) {
      return res.status(400).json({
        erro:
          "URL da notícia não fornecida.",
      });
    }

    const url =
      new URL(urlRecebido);

    /* ======================================== */
    /* SEGURANÇA */
    /* ======================================== */

    if (
      url.hostname !==
        "www.emmaus-international.org" ||
      !url.pathname.startsWith(
        "/en/news/"
      )
    ) {
      return res.status(400).json({
        erro:
          "URL de notícia inválida.",
      });
    }

    /* ======================================== */
    /* VERIFICAR SE JÁ ESTÁ COMPLETA */
    /* ======================================== */

    const guardada =
      await obterNoticiaGuardada(
        url.href
      );

    if (
      guardada &&
      Array.isArray(guardada.conteudo_pt) &&
      guardada.conteudo_pt.length > 0
    ) {
      console.log(
        "Notícia carregada do Supabase:",
        url.href
      );

      return res.json({
        titulo:
          guardada.titulo_pt,

        data:
          guardada.data || "",

        imagem:
          guardada.imagem || "",

        conteudo:
          guardada.conteudo_pt,

        urlOriginal:
          guardada.url,
      });
    }

    /* ======================================== */
    /* OBTER PÁGINA ORIGINAL */
    /* ======================================== */

    const response =
      await axios.get(
        url.href,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        }
      );

    const $ =
      cheerio.load(response.data);

    /* ======================================== */
    /* TÍTULO */
    /* ======================================== */

    const tituloOriginal =
      $("h1")
        .first()
        .text()
        .trim();

    /* ======================================== */
    /* IMAGEM */
    /* ======================================== */

    let imagem =
      $('meta[property="og:image"]')
        .attr("content") ||

      $('meta[name="twitter:image"]')
        .attr("content") ||

      $("article img")
        .first()
        .attr("src") ||

      $("main img")
        .first()
        .attr("src") ||

      "";

    if (imagem) {
      imagem =
        new URL(
          imagem,
          url.href
        ).href;
    }

    /* ======================================== */
    /* DATA */
    /* ======================================== */

    let data =
      $("time")
        .first()
        .text()
        .trim();

    if (!data) {
      const textoPagina =
        $("body")
          .text()
          .replace(/\s+/g, " ");

      const dataMatch =
        textoPagina.match(
          /\b\d{2}\.\d{2}\.\d{4}\b/
        );

      data = dataMatch
        ? dataMatch[0]
        : "";
    }

    /* ======================================== */
    /* ENCONTRAR CONTEÚDO */
    /* ======================================== */

    let paragrafos = [];

    /* Primeiro tentar dentro do article */

    const article =
      $("h1")
        .first()
        .closest("article");

    if (article.length) {
      paragrafos =
        article
          .find("p")
          .map((i, el) =>
            $(el).text().trim()
          )
          .get()
          .filter(
            (texto) => texto.length > 30
          );
    }

    /* Se não encontrou, procurar no main */

    if (paragrafos.length === 0) {
      paragrafos =
        $("main p")
          .map((i, el) =>
            $(el).text().trim()
          )
          .get()
          .filter(
            (texto) => texto.length > 30
          );
    }

    /* ======================================== */
    /* TRADUZIR TÍTULO */
    /* ======================================== */

    const titulo =
      guardada?.titulo_pt ||
      await traduzirTexto(
        tituloOriginal
      );

    /* ======================================== */
    /* TRADUZIR CONTEÚDO */
    /* ======================================== */

    const conteudoOriginal =
      paragrafos;

    const conteudo =
      await traduzirTextoLongo(
        paragrafos.join("\n\n")
      );

    /* ======================================== */
    /* GUARDAR TUDO NO SUPABASE */
    /* ======================================== */

    await guardarNoticia({
      url: url.href,

      titulo_original:
        tituloOriginal,

      titulo_pt:
        titulo,

      data,

      imagem,

      resumo_original:
        guardada?.resumo_original || "",

      resumo_pt:
        guardada?.resumo_pt || "",

      conteudo_original:
        conteudoOriginal,

      conteudo_pt:
        conteudo,
    });

    /* ======================================== */
    /* RESPONDER */
    /* ======================================== */

    res.json({
      titulo,
      data,
      imagem,
      conteudo,
      urlOriginal:
        url.href,
    });
  } catch (error) {
    console.error(
      "Erro ao obter notícia completa:",
      error.message
    );

    res.status(500).json({
      erro:
        "Não foi possível obter a notícia.",
    });
  }
});

/* ============================================ */
/* SERVIDOR */
/* ============================================ */

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `Servidor ativo na porta ${PORT}`
    );
  }
);