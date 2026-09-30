import { useCart } from '../context/CartContext.jsx'

function Carrito() {
  const { carrito } = useCart()

  if (carrito.length === 0) {
    return (
      <section>
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
    <section>
      <h2>Carrito de compras</h2>

      {carrito.map((producto) => (
        <article key={producto.id}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            width="120"
          />

          <h3>{producto.nombre}</h3>
          <p>Precio: ${producto.precio}</p>
          <p>Cantidad: {producto.cantidad}</p>
          <p>
            Subtotal: ${producto.precio * producto.cantidad}
          </p>
        </article>
      ))}

      <h3>Total: ${total}</h3>
    </section>
  )
}

export default Carrito
