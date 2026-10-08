import "../style/sobre.css";

function Sobre() {
  return (
    <div className="sobre-container">

  
      <section className="sobre-hero">
        <img
          src="/imagens/abbe.png"
          alt="Abbé Pierre"
          className="sobre-hero-image"
        />

        <div className="sobre-hero-content">
          <h1>História da Fundação</h1>

          <p>
            Conheça a história do movimento Emaús e o seu fundador
          </p>
        </div>
      </section>


      {/* ============================================ */}
      {/* DA FUNDAÇÃO ATÉ AO PRESENTE */}
      {/* ============================================ */}

      <section className="sobre-section">

        {/* Texto */}
        <div className="sobre-text">

          <h1>Da fundação até ao presente</h1>

          <p>
            Paris, 1949. Um homem chamado Georges, recém-saído de 20 anos
            de prisão, tenta suicidar-se. A família rejeitou-o. Não tem
            para onde ir. Levam-no ao Abbé Pierre.

            O padre não lhe oferece dinheiro nem abrigo. Diz-lhe algo
            inesperado: <strong>"Vem ajudar-me a ajudar."</strong>

            Georges torna-se o primeiro companheiro — palavra que vem
            de "partilhar o pão".

            Juntos, começam a construir casas para famílias sem teto,
            primeiro no jardim do sacerdote, depois onde conseguiam terreno.
          </p>

          <p>
            <strong>O inverno de 1954</strong> trouxe a tragédia: uma mulher
            despejada morre de frio na rua. Abbé Pierre lança na rádio um
            apelo desesperado — o célebre Grito do Abbé Pierre.

            A França responde com uma "insurreição de bondade":
            500 milhões de francos em doações, voluntários de todo o país,
            filas intermináveis de solidariedade. Portas de hotéis e de
            casas abrem-se para acolher aqueles que normalmente tinham
            apenas o chão duro da rua para dormir.
          </p>

          <p>
            Os companheiros que seguiam Abbé Pierre viviam e trabalhavam
            juntos, recolhendo e vendendo objetos usados para financiar a
            missão. Quem não tinha nada passava a ter um propósito e assim
            se formavam as primeiras comunidades de Emaús na França.
          </p>

          <p>
            A França chamou ao Abbé Pierre <strong>"O anjo dos pobres"</strong>
            e, durante largos anos, foi considerado uma das figuras mais
            admiradas de toda a França.

            A partir de França, Emaús expandiu-se para o resto do mundo.
            <strong>Hoje são 350 organizações em 37 países</strong>, unidas
            pela mesma convicção de que a solidariedade transforma vidas.
          </p>

        </div>


        {/* Imagem + citação */}
        <div className="sobre-image-wrapper">

          <div className="sobre-image">
            <img
              src="/imagens/fundador.jpg"
             
            />
          </div>

          <div className="quote">
            <p>
              “É a miséria que irá julgar os destinos da terra inteira.
              É ela também que nos julgará quando comparecermos diante
              de Deus.”
            </p>

            <cite>— Abbé Pierre</cite>
          </div>

        </div>

      </section>


      <section className="sobre-section reverse">

        {/* Texto */}
        <div className="sobre-text">

          <h2>Emaús Caminho e Vida Porto</h2>

          <p>
            A associação Emaús - Caminho e Vida é membro de Emaús
            Internacional e existe na cidade do Porto desde 1990,
            apresentando-se como uma proposta alternativa de vida para
            quem se encontra em situação de exclusão social.
          </p>

          <p>
            Primeiramente, a funcionar num espaço na Rua Mártires da
            Liberdade, cedido com o apoio do Governo Civil do Porto e
            Albergues Noturnos, servia sobretudo o propósito de acolher
            os companheiros da rua durante o dia. Aí podiam tomar banho,
            trocar de roupa, lanchar, beber algo quente, descansar e
            conversar se assim o desejassem.
          </p>

          <p>
            Salientamos as célebres e primeiras ceias de Natal na rua,
            na cidade do Porto, perto da estação de S. Bento / Sapadores
            Bombeiros, nos dias 24 de Dezembro, na noite de consoada,
            onde se sentavam à mesa 200/300 companheiros da rua, para
            saciar a "fome" da fraternidade, da amizade, da festa e da
            alegria que enchia o coração de todos.
          </p>

          <p>
            Tinha-se já dobrado o ano de 2000, quando foi possível,
            com a ajuda de um amigo, dar entrada para a aquisição de
            uma casa na Rua do Almada e permitir à instituição ter uma
            comunidade de acolhimento para companheiros que viviam na
            rua e passaram a ter um teto.
          </p>

          <p>
            Com o crescimento da cidade do Porto como centro turístico
            internacional e a pressão do mercado imobiliário, houve a
            necessidade de fazer transitar, mais recentemente, a
            comunidade para uma outra casa na Rua do Bonjardim,
            onde se encontra neste momento.
          </p>

          <p>
            Na casa comunitária, os companheiros partilham todos os dias,
            na companhia do Serafim (Pe. Diocesano), o teto, o pão,
            o trabalho, o descanso, as alegrias e as fragilidades,
            juntos e de mãos dadas.
          </p>

          <p>
            Os fundamentos que norteiam o trabalho de companheiros e
            voluntários na associação são aqueles definidos por Abbé
            Pierre originalmente.
          </p>

          <p>
            Apoiar a sociedade na redistribuição de bens excedentários
            a pessoas e famílias com carências e promoção da recolha e
            reciclagem de todos os materiais usados (móveis, louças,
            livros, roupa, calçado, etc.).
          </p>

          <p>
            Com mais de três décadas de atuação no Porto, a organização
            já impactou positivamente milhares de vidas, oferecendo não
            apenas bens materiais, mas também acolhimento, dignidade e
            novas oportunidades de vida.
          </p>

          <p>
            Estas oportunidades concretizam-se não apenas por Emaús
            Caminho e Vida, mas igualmente por importantes parcerias
            que se têm vindo a estabelecer com outras instituições que
            vão solidificando o objetivo principal de Emaús:
            <strong> "servir em primeiro lugar quem mais sofre".</strong>
          </p>

        </div>


        {/* Imagem */}
        <div className="sobre-image">

          <img
            src="/imagens/carrinha.jpg"
            
          />

        </div>

      </section>

    </div>
  );
}

export default Sobre;
