import { useCart } from '../context/CartContext.jsx'
import './Carrito.css'

function Carrito() {
  const { carrito } = useCart()

  if (carrito.length === 0) {
    return (
      <section className="carrito-container">
        <h2>Carrito de compras</h2>
        <p>Tu carrito está vacío.</p>
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
          </div>
        </article>
      ))}

      <h3 className="carrito-total">
        Total: ${total.toLocaleString('es-AR')}
      </h3>
    </section>
  )
}

export default Carrito
