import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../style/noticias.css";

const Noticias = () => {
  const [noticia, setNoticia] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");

  useEffect(() => {
    setLoading(true);
    setErro("");
    setNoticia(null);

    /* ======================================== */
    /* NOTÍCIA COMPLETA */
    /* ======================================== */

    if (url) {
      fetch(
        `http://localhost:5000/api/noticia?url=${encodeURIComponent(url)}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao obter a notícia.");
          }

          return response.json();
        })
        .then((data) => {
          setNoticia(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setErro("Não foi possível carregar a notícia.");
          setLoading(false);
        });

      return;
    }

    /* ======================================== */
    /* LISTA DE NOTÍCIAS */
    /* ======================================== */

    fetch("http://localhost:5000/api/noticias")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao obter as notícias.");
        }

        return response.json();
      })
      .then((data) => {
        setNoticias(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setErro("Não foi possível carregar as notícias.");
        setLoading(false);
      });
  }, [url]);

  return (
    <div className="noticias-container">

      {/* ======================================== */}
      {/* HERO */}
      {/* ======================================== */}

      <section className="noticias-hero">
        <h1>Notícias</h1>

        <p>
          As principais notícias da Emmaüs International
        </p>
      </section>


      {/* ======================================== */}
      {/* CARREGAMENTO */}
      {/* ======================================== */}

      {loading && (
        <section className="noticias-section">
          <p className="noticia-status">
            A carregar...
          </p>
        </section>
      )}


      {/* ======================================== */}
      {/* ERRO */}
      {/* ======================================== */}

      {!loading && erro && (
        <section className="noticias-section">
          <p className="noticia-status noticia-erro">
            {erro}
          </p>
        </section>
      )}


      {/* ======================================== */}
      {/* LISTA DE NOTÍCIAS */}
      {/* ======================================== */}

      {!loading && !erro && !url && (
        <section className="noticias-section">

          {noticias.length > 0 ? (
            <div className="noticias-grid">

              {noticias.map((item, index) => (
                <article
                  className="noticia-card"
                  key={item.link || index}
                >

                  {/* Imagem */}
                  {item.imagem && (
                    <div className="noticia-imagem">
                      <img
                        src={item.imagem}
                        alt={item.titulo}
                      />
                    </div>
                  )}


                  {/* Conteúdo */}
                  <div className="noticia-content">

                    <h3>
                      {item.titulo}
                    </h3>

                    <p className="noticia-data">
                      {item.data}
                    </p>

                    <p className="noticia-descricao">
                      {item.resumo}
                    </p>

                    <Link
                      to={`/noticias?url=${encodeURIComponent(item.link)}`}
                      className="noticia-link"
                    >
                      Ler notícia <span>→</span>
                    </Link>

                  </div>

                </article>
              ))}

            </div>
          ) : (
            <p className="noticia-status">
              Não existem notícias disponíveis.
            </p>
          )}

        </section>
      )}


      {/* ======================================== */}
      {/* NOTÍCIA COMPLETA */}
      {/* ======================================== */}

      {!loading && !erro && url && noticia && (
        <section className="noticias-section">

          <article className="noticia-completa">

            {/* Imagem */}
            {noticia.imagem && (
              <div className="noticia-imagem">
                <img
                  src={noticia.imagem}
                  alt={noticia.titulo}
                />
              </div>
            )}


            {/* Conteúdo */}
            <div className="noticia-content">

              <h2>
                {noticia.titulo}
              </h2>

              <p className="noticia-data">
                {noticia.data}
              </p>

              <div className="noticia-descricao">

                {noticia.conteudo &&
                noticia.conteudo.length > 0 ? (
                  noticia.conteudo.map(
                    (paragrafo, index) => (
                      <p key={index}>
                        {paragrafo}
                      </p>
                    )
                  )
                ) : (
                  <p>
                    Não foi possível obter o conteúdo da notícia.
                  </p>
                )}

              </div>


              {/* Link para a notícia original */}
              {noticia.urlOriginal && (
                <a
                  href={noticia.urlOriginal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="noticia-original"
                >
                  Ver notícia original na Emmaüs International →
                </a>
              )}

            </div>

          </article>

        </section>
      )}

    </div>
  );
};

export default Noticias;

