import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Contacto */}
        <div className="footer-column">
          <h4>Contacto</h4>

          <a href="mailto:emauscaminhoevidaporto@gmail.com">
            emauscaminhoevidaporto@gmail.com
          </a>

          <a href="tel:+351919829496">
            +351 919 829 496
          </a>

          <a href="tel:+351222024018">
            +351 22 202 40 18
          </a>
        </div>


        {/* Links */}
        <div className="footer-column">
          <h4>Links</h4>

          <Link to="/">Home</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/espaco">Espaço Solidário</Link>
          <Link to="/voluntariado">Voluntariado</Link>
          <Link to="/mundo">Emaús no Mundo</Link>
          <Link to="/noticias">Notícias</Link>
          <Link to="/contactos">Contactos</Link>
          <Link to="/manifesto">Manifesto</Link>
        </div>


        {/* Redes Sociais */}
        <div className="footer-column">
          <h4>Redes Sociais</h4>

          <div className="footer-social">

            <a
              href="https://www.facebook.com/profile.php?id=100068862378510"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/icones/facebook.svg"
                alt="Facebook"
              />
              <span>Facebook</span>
            </a>

            <a
              href="https://www.instagram.com/emauscaminhoevida/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/icones/instagram.svg"
                alt="Instagram"
              />
              <span>Instagram</span>
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;