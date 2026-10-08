import { useState } from "react";
import emailjs from "@emailjs/browser";
import "../style/contactos.css";

const Contactos = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
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
      formData,
      "j2WAFmWNjpM9elySW"
    )
    .then(() => {
      alert("Mensagem enviada com sucesso!");
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    })
    .catch(() => {
      alert("Erro ao enviar. Tenta novamente.");
    });
  };

  return (
    <div className="contactos-container">
      <section className="contactos-hero">
        <h1> Contactos</h1>
        <p>Estamos disponíveis para ajudar. Fala connosco!</p>
      </section>

      <section className="contactos-info-section">
        <div className="contactos-grid">
          <div className="contacto-card">
  <h3>Morada</h3>

  <div className="morada-bloco">
    <p>Rua do Bonjardim, 1290</p>
    <p>4000-307 Porto</p>
    <a
      href="https://www.google.com/maps/search/?api=1&query=Rua+do+Bonjardim+1290+4000-307+Porto"
      target="_blank"
      rel="noopener noreferrer"
    >
      Ver no mapa ↗
    </a>
  </div>

  <div className="morada-bloco">
    <p>Rua de Serpa Pinto, 556</p>
    <p>4250-050 Porto</p>
    <a
      href="https://www.google.com/maps/search/?api=1&query=Rua+de+Serpa+Pinto+556+4250-050+Porto"
      target="_blank"
      rel="noopener noreferrer"
    >
      Ver no mapa ↗
    </a>
  </div>
</div>

<div className="contacto-card">
  <h3>Telefone</h3>
  <p>+351 919 829 496</p>
</div>

<div className="contacto-card">
  <h3>Email</h3>
  <p>
    <a
      href="mailto:emauscaminhoevidaporto@gmail.com"
      className="email-link"
    >
      emauscaminhoevidaporto@gmail.com
    </a>
  </p>
</div>

          <div className="contacto-card">
           
            <h3>Horário</h3>
            <p><strong>Terça a Sexta-feira:</strong> 09h - 12h30</p>
            <p><strong>Sábado:</strong> 09h - 12h30| 15h - 18h</p>
            <p><strong>Domingo e Segunda:</strong> Encerrado</p>
          </div>
        </div>
      </section>

      <section className="formulario-section">
        <div className="formulario-content">
          <div className="formulario-header">
            <h2>Fala Connosco</h2>
            <p>Preenche o formulário abaixo e entraremos em contacto</p>
          </div>

          <form onSubmit={handleSubmit} className="contactos-form">
            <div className="form-group">
              <label>Nome completo</label>
              <input type="text" name="name" placeholder="Como te chamas?" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="O teu email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Mensagem</label>
              <textarea name="message" placeholder="Escreve aqui..." value={formData.message} onChange={handleChange} required rows="5" />
            </div>

            <button type="submit" className="submit-btn">Enviar mensagem →</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contactos;