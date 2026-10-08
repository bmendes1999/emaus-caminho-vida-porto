import { Link, useLocation } from "react-router-dom";
import "../style/navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/sobre", label: "Sobre" },
  { to: "/espaco", label: "Espaço Solidário" },
  { to: "/voluntariado", label: "Voluntariado" },
  { to: "/mundo", label: "Emaús no Mundo" },
  { to: "/noticias", label: "Notícias" },
  { to: "/contactos", label: "Contactos" },
  { to: "/manifesto", label: "Manifesto" },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/imagens/emaus.png" alt="Emaús" />
        </Link>

        <ul className="navbar-links">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`navbar-link ${location.pathname === to ? "active" : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;