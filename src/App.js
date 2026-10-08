import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./style/main.css";

import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import EspacoSolidario from "./pages/EspacoSolidario";
import Noticias from "./pages/Noticias";
import Voluntariado from "./pages/Voluntariado";
import Contactos from "./pages/Contactos";
import EmausMundo from "./pages/EmausMundo";
import Manifesto from "./pages/Manifesto";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/espaco" element={<EspacoSolidario />} />
        <Route path="/voluntariado" element={<Voluntariado />} />
        <Route path="/mundo" element={<EmausMundo />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/manifesto" element={<Manifesto />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;