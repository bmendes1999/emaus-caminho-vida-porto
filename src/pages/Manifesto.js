import "../style/manifesto.css";

function Manifesto() {
  return (
    <main className="manifesto-container">

      <section className="manifesto-hero">
        <h1>Manifesto Universal de Emaús</h1>

       
      </section>

      <section className="manifesto-content">

        <h2>“Recriar o mundo” é possível</h2>

        <p>
          O Manifesto Universal de Emaús reúne os princípios, valores
          e compromissos que estão na base da ação do Movimento Emaús.
        </p>

       
        <a
          href="/Manifesto de Emaús internacional.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="manifesto-link"
        >
          Consultar o Manifesto Universal de Emaús (PDF)
        </a>

      </section>

    </main>
  );
}

export default Manifesto;