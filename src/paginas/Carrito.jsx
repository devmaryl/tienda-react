import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './Carrito.css'

function Carrito() {
  const {
    carrito,
    removeFromCart,
    clearCart,
  } = useCart()

  if (carrito.length === 0) {
    return (
      <section className="carrito-container">
        <h2>Carrito de compras</h2>

        <p>Tu carrito está vacío.</p>

        <Link to="/productos">
          Ver productos
        </Link>
      </section>
    )
  }

  const total = carrito.reduce(
    (acumulador, producto) =>
      acumulador + producto.precio * producto.cantidad,
    0
  )

  return (
    <section className="carrito-container">
      <h2>Carrito de compras</h2>

      {carrito.map((producto) => (
        <article
          key={producto.id}
          className="carrito-item"
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
          />

          <div className="carrito-info">
            <h3>{producto.nombre}</h3>

            <p>
              Precio: ${producto.precio.toLocaleString('es-AR')}
            </p>

            <p>
              Cantidad: {producto.cantidad}
            </p>

            <p>
              Subtotal: $
              {(producto.precio * producto.cantidad).toLocaleString('es-AR')}
            </p>

            <button
              type="button"
              onClick={() => removeFromCart(producto.id)}
            >
              Eliminar
            </button>
          </div>
        </article>
      ))}

      <h3 className="carrito-total">
        Total: ${total.toLocaleString('es-AR')}
      </h3>

      <button
        type="button"
        onClick={clearCart}
      >
        Vaciar carrito
      </button>
    </section>
  )
}

export default Carrito
