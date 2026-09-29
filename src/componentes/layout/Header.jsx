import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <h1>📷 Focus Store</h1>

      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Inicio</Link>
          </li>

          <li>
            <Link to="/productos">Productos</Link>
          </li>

          <li>
            <Link to="/carrito">Carrito</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header