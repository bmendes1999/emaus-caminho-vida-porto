import { useState } from "react";
import emailjs from "@emailjs/browser";
import "../style/voluntariado.css";

const Voluntariado = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    contacto: "",
    disponibilidade: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_lcszo8q",
      "template_hgpfbry",
      {
        nome: formData.nome,
        email: formData.email,
        contacto: formData.contacto,
        disponibilidade: formData.disponibilidade
      },
      "j2WAFmWNjpM9elySW"
    )
    .then((res) => {
      console.log("OK", res);
      alert("Inscrição enviada com sucesso! Entraremos em contacto em breve.");

      setFormData({
        nome: "",
        email: "",
        contacto: "",
        disponibilidade: ""
      });
    })
    .catch((err) => {
      console.log("ERRO COMPLETO:", err);
      alert("Erro ao enviar. Por favor, tenta novamente.");
    });
  };

  return (
    <div className="voluntariado-container">
      {/* Hero Section */}
    <section className="sobre-hero">
        <img
          src="/imagens/voluntarios.jpg"
          
          className="sobre-hero-image"
        />

        <div className="sobre-hero-content">
          <h1>Voluntariado</h1>

          <p>
            Junta-te a nós e faz parte da mudança na comunidade
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="voluntariado-info-section">
        <div className="voluntariado-grid">
          <div className="voluntariado-card">
            <div className="card-icon"></div>
            <h2>O que é?</h2>
            <p>
             O voluntariado em Emaús permite trabalhar junto com os companheiros 
             e outros voluntários no trabalho diário que se realiza na instituição.
            </p>
          </div>

          <div className="voluntariado-card">
            <div className="card-icon"></div>
            <h2>O que fazemos?</h2>
            <p>
              Os voluntários em Emaús têm a possibilidade de participar no dia à dia da vida da comunidade, podendo contribuir com aquilo que são as suas competências e os seus gostos. Existem sempre necessidades ao nível da triagem, organização e exposição das doações, mas também apoio ás pessoas que nos procuram no espaço solidário. Apesar deste ser o trabalho mais visível existem outras funções que podem ser desempenhadas até mesmo fora do espaço do armazém se o voluntário mostrar apetência por outra área.
            </p>
          </div>

          <div className="voluntariado-card">
            <div className="card-icon"></div>
            <h2>Porquê ser voluntário?</h2>
            <p>
              O voluntariado é uma experiência enriquecedora a nível pessoal, humano e até mesmo profissional, que se traduz numa experiência vivência de proximidade com pessoas que sofrem e que se dispõe a superar grandes dificuldades. É um tempo de partilha, de qualidade e um momento de dar e receber.
            </p>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="formulario-section">
        <div className="formulario-content">
          <div className="formulario-header">
            <h2>Quero ser voluntário</h2>
            <p>Preenche o formulário abaixo e entraremos em contacto contigo</p>
          </div>

          <form onSubmit={handleSubmit} className="voluntariado-form">
            <div className="form-group">
              <label>Nome completo</label>
              <input
                type="text"
                name="nome"
                placeholder="Como te chamas?"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="O teu endereço de email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Contacto telefónico</label>
              <input
                type="tel"
                name="contacto"
                placeholder="Número de telemóvel"
                value={formData.contacto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Disponibilidade</label>
              <textarea
                name="disponibilidade"
                placeholder="Dias e horas em que podes ajudar (ex: Segunda e Quarta à tarde, Sábados de manhã)"
                value={formData.disponibilidade}
                onChange={handleChange}
                required
                rows="4"
              />
            </div>

            <button type="submit" className="submit-btn">
              Enviar inscrição
              <span className="btn-icon">→</span>
            </button>
          </form>

          
        </div>
      </section>
    </div>
  );
};

export default Voluntariado;