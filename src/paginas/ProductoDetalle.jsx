import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config.js'
import { useCart } from '../context/CartContext.jsx'

function ProductoDetalle() {
  const { id } = useParams()

  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const { addToCart } = useCart()

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setCargando(true)
        setError(null)

        const productoRef = doc(db, 'productos', id)
        const respuesta = await getDoc(productoRef)

        if (!respuesta.exists()) {
          throw new Error('Producto no encontrado')
        }

        setProducto({
          ...respuesta.data(),
          id: respuesta.id,
        })
      } catch (error) {
        console.error('Error al cargar el producto:', error)
        setError('No se pudo cargar el producto.')
      } finally {
        setCargando(false)
      }
    }

    cargarProducto()
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

      <p>
        Precio: ${producto.precio.toLocaleString('es-AR')}
      </p>

      <p>Stock disponible: {producto.stock}</p>

      <button onClick={() => addToCart(producto)}>
        Agregar al carrito
      </button>
    </section>
  )
}

export default ProductoDetalle

