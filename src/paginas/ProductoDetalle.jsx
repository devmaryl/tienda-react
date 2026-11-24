import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { Helmet } from 'react-helmet'
import { Button, Container, Spinner } from 'react-bootstrap'
import { FaCartPlus } from 'react-icons/fa'
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
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />

        <p className="mt-3">
          Cargando producto...
        </p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <p>Error: {error}</p>
      </Container>
    )
  }

  return (
    <>
      <Helmet>
        <title>
          Focus Store | {producto.nombre}
        </title>

        <meta
          name="description"
          content={`Conocé ${producto.nombre}. ${producto.descripcion}`}
        />
      </Helmet>

      <Container className="py-5 text-center">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{
            maxWidth: '350px',
            width: '100%',
            height: '300px',
            objectFit: 'contain',
          }}
        />

        <h2 className="mt-4">
          {producto.nombre}
        </h2>

        <p className="lead">
          {producto.descripcion}
        </p>

        <p className="fs-4 fw-bold">
          ${producto.precio.toLocaleString('es-AR')}
        </p>

        <p>
          Stock disponible: {producto.stock}
        </p>

        <Button
          variant="dark"
          onClick={() => addToCart(producto)}
          aria-label={`Agregar ${producto.nombre} al carrito`}
        >
          <FaCartPlus className="me-2" />
          Agregar al carrito
        </Button>
      </Container>
    </>
  )
}

export default ProductoDetalle

