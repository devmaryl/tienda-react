import { Link } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import './Header.css'

function Header() {
  const { usuario, cerrarSesion } = useAuth()

  const handleLogout = async () => {
    try {
      await cerrarSesion()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

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
            <Link to="/carrito">
              Carrito <CartWidget />
            </Link>
          </li>

          {usuario ? (
            <>
              <li>
                <Link to="/administracion">
                  Administración
                </Link>
              </li>

              <li>
                <span>{usuario.email}</span>
              </li>

              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">
                Iniciar sesión
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
