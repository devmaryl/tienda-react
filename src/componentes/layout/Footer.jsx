import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-info">
        <h3>Focus Store</h3>
        <p>Cámaras, lentes y accesorios para capturar cada momento.</p>
      </div>

      <div className="equipo">
        <h4>Equipo</h4>

        <div className="equipo-cards">
          <article className="card-persona">
            <h5>María</h5>
            <p>Desarrollo Frontend</p>
          </article>

          <article className="card-persona">
            <h5>Juan</h5>
            <p>Diseño UX/UI</p>
          </article>

          <article className="card-persona">
            <h5>Ana</h5>
            <p>Soporte y Atención</p>
          </article>
        </div>
      </div>
    </footer>
  )
}

export default Footer