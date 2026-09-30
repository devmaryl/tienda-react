import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function ProductoDetalle() {
  const { id } = useParams()

  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const { addToCart } = useCart()

  useEffect(() => {
    fetch('/data/productos.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el producto')
        }

        return respuesta.json()
      })
      .then((datos) => {
        const productoEncontrado = datos.find(
          (producto) => producto.id === Number(id)
        )

        if (!productoEncontrado) {
          throw new Error('Producto no encontrado')
        }

        setProducto(productoEncontrado)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setCargando(false)
      })
  }, [id])

  if (cargando) {
    return <p>Cargando producto...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <section>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        width="300"
      />

      <h2>{producto.nombre}</h2>

      <p>{producto.descripcion}</p>

      <p>Precio: ${producto.precio.toLocaleString('es-AR')}</p>

      <p>Stock disponible: {producto.stock}</p>

      <button onClick={() => addToCart(producto)}>
        Agregar al carrito
      </button>
    </section>
  )
}

export default ProductoDetalle
