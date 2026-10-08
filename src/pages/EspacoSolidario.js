import "../style/espacosolidario.css";

const EspacoSolidario = () => {
  return (
    <div className="espaco-container">

      {/* Hero Section */}
      <section className="espaco-hero">
        <img
          src="/imagens/boneco.jpg"
          alt="Espaço Solidário"
          className="espaco-hero-image"
        />

        <div className="espaco-hero-content">
          <h1>Espaço Solidário</h1>

          <p>
            Transformar doações em oportunidades
          </p>
        </div>
      </section>

      {/* Apresentação */}
      <section className="espaco-section">
        <div className="espaco-text">
          <h1>Sobre o Espaço Solidário</h1>
          <p>
           O espaço solidário é o local onde, todos os dias, companheiros e voluntários realizam uma boa parte do trabalho de Emaús. Nele ocorrem não apenas o armazenamento das doações, a reparação dos equipamentos e bens que são recuperáveis, a triagem / separação dos produtos que são recebidos, 
           mas também a sua exposição e posterior partilha a preços simbólicos.
          </p>
          <p>
            Pretende-se neste espaço que a solidariedade seja sempre vivida nos dois sentidos. Assim, quem aparece e encontra algo que lhe interessa ou faz falta pode levar, sem para isso ter de despender de grandes quantias de dinheiro, e por outro lado, leva o que precisa e ajuda igualmente 
            a comunidade a obter os fundos de que necessita para continuar a financiar-se. 
          </p>
          <p>
            O processo solidário começa logo no momento da doação: alguém doa aquilo que já não lhe faz falta ou, por vezes, até o que lhe está a ocupar espaço, e esse produto, equipamento, vai servir a outros, numa concretização clara e objetiva daquilo que é a economia circular e a solidariedade em movimento.
          </p>
          <p>
            Neste modelo, onde os recursos são poupados e reutilizados, apoiam-se pessoas em situação de vulnerabilidade, ajudam-se a financiar projetos nacionais e internacionais através da partilha com Emaús Europa e Emaús Internacional e, em suma, promove-se a solidariedade.
          </p>
          Com quase três décadas de trabalho no Porto, Emaús Caminho e Vida já teve a possibilidade de impactar direta ou indiretamente a vida de centenas de pessoas. Isso foi e é possível, permitindo o acesso não apenas a bens materiais, mas também disponibilizando o acolhimento, a promoção da dignidade e a oportunidade de cada companheiro se encontrar consigo próprio, com os outros e viver uma vida nova
           <p>

           </p>
        </div>

        <div className="espaco-image">
          <img src="imagens/loja.webp" alt="Loja Solidária Emaús" />
        </div>
      </section>

      {/* Produtos Disponíveis - COM IMAGENS DOS CARDS */}
      <section className="produtos-section">
        <div className="section-header">
          <h2>Produtos Disponíveis</h2>
          <p>Artigos de qualidade a preços acessíveis, todos prontos para uma nova vida</p>
        </div>

        <div className="produtos-grid">
          <div className="produto-card">
            <div className="produto-imagem">
              <img src="imagens/roupas.webp" alt="Roupas" />
            </div>
            <h3>Roupas</h3>
            <p>Roupas em bom estado, prontas a encontrar um novo lar. Para toda a família.</p>
          </div>

          <div className="produto-card">
            <div className="produto-imagem">
              <img src="imagens/livros.webp" alt="Livros" />
            </div>
            <h3>Livros</h3>
            <p>Livros doados que inspiram, educam e entretêm. Ficção, não-ficção e infantis.</p>
          </div>

          <div className="produto-card">
            <div className="produto-imagem">
              <img src="imagens/brinquedos.webp" alt="Brinquedos" />
            </div>
            <h3>Brinquedos</h3>
            <p>Brinquedos reutilizados que continuam a fazer sorrir crianças de todas as idades.</p>
          </div>

        </div>
      </section>

      {/* Como Participar */}
      <section className="participar-section">
        <div className="participar-content">
          <h2>Como Participar</h2>
          <p>Existem várias formas de contribuir com o Espaço Solidário e fazer a diferença na comunidade:</p>
          
          <div className="participar-lista">
            <div className="participar-item">
             
              <div className="item-text">
                <h3>Doar produtos em bom estado</h3>
                <p>Roupas, livros, brinquedos, móveis e outros artigos que já não usa podem ter uma nova vida.</p>
              </div>
            </div>
            
            <div className="participar-item">
             
              <div className="item-text">
                <h3>Comprar na loja</h3>
                <p>Ao comprar, está a apoiar diretamente os nossos projetos sociais e a promover a economia circular.</p>
              </div>
            </div>
            
            <div className="participar-item">
              
              <div className="item-text">
                <h3>Ser voluntário</h3>
                <p>Ajude nas atividades da comunidade, desde atendimento ao público até organização de doações.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Localização e Horário */}
      <section className="localizacao-section">
        <div className="localizacao-content">
          <h2> Onde nos encontrar</h2>
          
          <div className="localizacao-info">
            <div className="info-card">
              
              <h3>Morada</h3>
              <a 
                href="https://www.google.com/maps/dir/41.1336704,-8.5590016/41.1655,-8.62035/@41.1502763,-8.667829,22221m/data=!3m2!1e3!4b1!4m4!4m3!1m1!4e1!1m0?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="morada-link"
              >
                Espaço Solidário – Loja Solidária ↗
              </a>
            </div>
            
            <div className="info-card">
              
              <h3>Horário de Funcionamento</h3>
              <div className="horario">
                <p><strong>Terça a Sexta-feira:</strong> 09h - 12h30</p>
                <p><strong>Sábado:</strong> 09h - 12h30| 15h - 18h</p>
                <p><strong>Domingo e Segunda:</strong> Encerrado</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EspacoSolidario;