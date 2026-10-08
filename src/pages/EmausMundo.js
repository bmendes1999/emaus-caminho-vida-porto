import "../style/emausmundo.css";

const EmausMundo = () => {
  return (
    <div className="emausmundo-container">

      {/* Hero */}
      <section className="emausmundo-hero">
        <img
          src="/imagens/mapa.jpg"
          className="emausmundo-hero-image"
        />

        <div className="emausmundo-hero-content">
          <h1>Emaús no Mundo</h1>
          <p>O movimento Emaús está presente em diversos países</p>
        </div>
      </section>

      {/* Texto */}
      <section className="emausmundo-content">
        <div className="content-text">
          <h2>Presença Global</h2>

          <p>
            O Movimento Emaús é um conjunto de associações e grupos solidários
            que nasceram primeiro em França e depois foram aparecendo noutros
            países europeus, multiplicando-se por países de todo o mundo, e que
            partilham os fundamentos do Manifesto Internacional de Emaús.{" "}
            <strong>
              Consultar o separador "Manifesto" para mais informações.
            </strong>
          </p>

          <p>
            A primeira comunidade, criada em 1954 por Abbé Pierre, tinha uma
            inspiração cristã, mas, de forma gradual, o movimento deixou de ter
            um carácter religioso e passou a ter como foco o combate à exclusão
            social e à pobreza, por diversos meios e adaptados ao contexto dos
            locais onde se encontra.
          </p>

          <p>
            Quando, em setembro de 1999, foi realizada a 9.ª Assembleia Mundial
            de "Emaús Internacional", foi também redigida a sua declaração, que
            se posicionou "contra a globalização da pobreza" e apelou à
            responsabilidade de cada cidadão, "nas associações, nos movimentos
            de consumidores, nas empresas, nos sindicatos, nos partidos
            políticos", de todo o mundo, para "lutar por uma globalização da
            fraternidade, por uma economia que dê lugar aos marginalizados e
            excluídos, para se tornarem atores de uma profunda mudança de
            mentalidades, para lutar pela democracia no mundo e contra a
            intolerância religiosa, étnica ou cultural". Várias outras
            assembleias mundiais se realizaram posteriormente, como a realizada
            no Burquina Faso em 2003, a de Anglet em 2012, ou a de 2017, em
            Itália, em que centenas de representantes de várias partes do mundo
            (também de Emaús Portugal, inclusive da nossa comunidade) definiram
            as ações prioritárias da instituição e as causas que devem nortear
            o seu trabalho.
          </p>

          <p>
            Neste momento, a instituição a nível internacional é composta por
            mais de 425 organizações locais em todo o mundo, funcionando de
            forma descentralizada. A decisão de descentralizar o funcionamento
            do movimento Emaús foi tomada na Assembleia Geral de 2003, com base
            na conclusão de que Emaús necessitava de voz e ação política em
            todos os seus níveis regionais. Dentro desta estrutura
            descentralizada, os membros de Emaús de uma dada região agrupam-se
            naquilo a que chamamos Organização Regional (Emaús África, Emaús
            América, Emaús Ásia e Emaús Europa), cuja missão é adaptar as
            decisões tomadas a nível internacional às particularidades
            regionais.
          </p>

          <p>
            As organizações regionais, como estruturas descentralizadas, têm
            assim as seguintes funções: coordenar a região e os seus membros,
            organizar o objetivo comum e a solidariedade entre os seus grupos,
            ter uma política ao nível regional, acompanhar e dar seguimento aos
            pedidos de integração de novos membros e formar atores a título
            regional.
          </p>

          <p>
            É importante perceber que, se em alguns continentes, como o
            europeu, ainda poderão fazer sentido comunidades que vivem
            essencialmente da recolha de doações, da sua recuperação e posterior
            partilha, nas comunidades africanas o trabalho foca-se em
            necessidades mais prementes, como a construção de canais de acesso
            à água potável ou de escolas, e, na América Latina, por exemplo, no
            apoio às populações que vivem em bairros de lata, como no Brasil.
          </p>
        </div>
      </section>

      {/* Mapa */}
      <section className="mundo-mapa">
        <a
          href="https://www.emmaus-international.org/en/member-groups/emmaus-around-the-world/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver a distribuição da Emaús no Mundo"
          className="mapa-link"
        >
          <img
            src="/imagens/mapa2.jpg"
            alt="Mapa da distribuição de Emaús no mundo"
            className="mapa-imagem"
          />
        </a>

        <p className="mapa-legenda">
          Clique no mapa para consultar a distribuição da Emaús no Mundo.
        </p>
      </section>

    </div>
  );
};

export default EmausMundo;