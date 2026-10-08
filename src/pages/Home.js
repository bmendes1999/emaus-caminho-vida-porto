import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/App.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {

  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("http://localhost:5000/api/noticias")
    .then((response) => response.json())
    .then((data) => {
      setNoticias(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
}, []);


  return (
    <>
      {/* Hero Section */}
      <section className="hero">

        {/* Quadrado roxo no topo */}
      <div className="hero-content">
  <h1>Bem-vindo ao Emaús Caminho e Vida Porto</h1>

  <p>
    “É a miséria que irá julgar os destinos da terra inteira.
    É ela também que nos julgará quando comparecermos diante de Deus.”
  </p>

  <cite>— Abbé Pierre</cite>
</div>

        {/* Carrossel */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          loop={true}
          className="hero-slider"
        >
          <SwiperSlide>
            <img
              src="/imagens/imagem_home.jpg"
              alt="Emaús Caminho e Vida"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="/imagens/imagem 1.png"
              alt="Emaús Caminho e Vida"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="/imagens/imagem 2.png"
              alt="Emaús Caminho e Vida"
            />
          </SwiperSlide>
        </Swiper>

        {/* Botão por baixo das fotos */}
        <Link to="/sobre" className="hero-button">
          Saiba Mais
        </Link>

      </section>

      {/* Feature Cards */}
      <section className="features">
  <div className="news-header">
    <h2>Notícias em Destaque</h2>
    <p>
      Acompanhe as principais notícias da Emmaüs International.
    </p>
  </div>

  {loading ? (
    <p className="news-status">A carregar notícias...</p>
  ) : (
    <div className="news-grid">
      {noticias.slice(0, 3).map((noticia, index) => (
        <article className="news-card" key={index}>

          <div className="news-image-container">
            <img
              src={noticia.imagem}
              alt={noticia.titulo}
              className="news-image"
            />
          </div>

          <div className="news-card-content">

            <span className="news-date">
              {noticia.data}
            </span>

            <h3>{noticia.titulo}</h3>

            <p>{noticia.resumo}</p>

            
            <Link
  to={`/noticias?url=${encodeURIComponent(noticia.link)}`}
  className="news-link"
>
  Ler notícia <span>→</span>
</Link>
            

          </div>

        </article>
      ))}
    </div>
  )}
</section>
    </>
  );
}

export default Home;