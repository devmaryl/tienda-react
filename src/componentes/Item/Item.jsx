import { Link } from 'react-router-dom'
import './Item.css'

function Item({ producto }) {
  return (
    <article className="item-card">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="item-img"
      />

      <h3>{producto.nombre}</h3>

      <p>
        ${producto.precio.toLocaleString('es-AR')}
      </p>

      <p>Stock: {producto.stock}</p>

      <Link
        to={`/producto/${producto.id}`}
        className="item-button"
      >
        Ver detalle
      </Link>
    </article>
  )
}

export default Item
