import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import {
  Button,
  Container,
  Form,
  Modal,
  Spinner,
} from 'react-bootstrap'
import {
  FaEdit,
  FaPlus,
  FaSave,
  FaTimes,
  FaTrash,
} from 'react-icons/fa'
import { db } from '../firebase/config.js'

function Administracion() {
  const [productos, setProductos] = useState([])
  const [productoAEditar, setProductoAEditar] = useState(null)
  const [productoAEliminar, setProductoAEliminar] = useState(null)

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [categoria, setCategoria] = useState('')
  const [imagen, setImagen] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const [cargando, setCargando] = useState(false)
  const [cargandoProductos, setCargandoProductos] = useState(true)
  const [eliminando, setEliminando] = useState(false)
  const [error, setError] = useState('')

  const cargarProductos = async () => {
    try {
      setCargandoProductos(true)
      setError('')

      const productosRef = collection(db, 'productos')
      const respuesta = await getDocs(productosRef)

      const productosFirebase = respuesta.docs.map((documento) => ({
        ...documento.data(),
        id: documento.id,
      }))

      setProductos(productosFirebase)
    } catch (error) {
      console.error('Error al cargar productos:', error)
      setError('No se pudieron cargar los productos.')
    } finally {
      setCargandoProductos(false)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  useEffect(() => {
    if (productoAEditar) {
      setNombre(productoAEditar.nombre)
      setPrecio(productoAEditar.precio)
      setStock(productoAEditar.stock)
      setCategoria(productoAEditar.categoria)
      setImagen(productoAEditar.imagen)
      setDescripcion(productoAEditar.descripcion)
    }
  }, [productoAEditar])

  const limpiarFormulario = () => {
    setNombre('')
    setPrecio('')
    setStock('')
    setCategoria('')
    setImagen('')
    setDescripcion('')
    setProductoAEditar(null)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (nombre.trim() === '') {
      setError('El nombre del producto es obligatorio.')
      return
    }

    if (Number(precio) <= 0) {
      setError('El precio debe ser mayor que cero.')
      return
    }

    if (Number(stock) < 0) {
      setError('El stock no puede ser negativo.')
      return
    }

    const datosProducto = {
      nombre: nombre.trim(),
      precio: Number(precio),
      stock: Number(stock),
      categoria: categoria.trim(),
      imagen: imagen.trim(),
      descripcion: descripcion.trim(),
    }

    try {
      setCargando(true)

      if (productoAEditar) {
        const productoRef = doc(
          db,
          'productos',
          productoAEditar.id
        )

        await updateDoc(productoRef, datosProducto)

        alert('Producto actualizado correctamente.')
      } else {
        const productosRef = collection(db, 'productos')

        await addDoc(productosRef, datosProducto)

        alert('Producto agregado correctamente.')
      }

      limpiarFormulario()
      await cargarProductos()
    } catch (error) {
      console.error('Error al guardar producto:', error)
      setError('No se pudo guardar el producto.')
    } finally {
      setCargando(false)
    }
  }

  const handleEditar = (producto) => {
    setProductoAEditar(producto)
    setError('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const abrirModalEliminar = (producto) => {
    setProductoAEliminar(producto)
  }

  const cerrarModalEliminar = () => {
    if (!eliminando) {
      setProductoAEliminar(null)
    }
  }

  const confirmarEliminacion = async () => {
    if (!productoAEliminar) {
      return
    }

    try {
      setEliminando(true)
      setError('')

      const productoRef = doc(
        db,
        'productos',
        productoAEliminar.id
      )

      await deleteDoc(productoRef)

      if (productoAEditar?.id === productoAEliminar.id) {
        limpiarFormulario()
      }

      setProductoAEliminar(null)
      await cargarProductos()
    } catch (error) {
      console.error('Error al eliminar producto:', error)
      setError('No se pudo eliminar el producto.')
    } finally {
      setEliminando(false)
    }
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">
        Administración de productos
      </h2>

      <h3 className="mb-3">
        {productoAEditar
          ? 'Editar producto'
          : 'Agregar producto'}
      </h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            Nombre
          </Form.Label>

          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Precio
          </Form.Label>

          <Form.Control
            type="number"
            min="1"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Stock
          </Form.Label>

          <Form.Control
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Categoría
          </Form.Label>

          <Form.Control
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Ruta de imagen
          </Form.Label>

          <Form.Control
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Descripción
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </Form.Group>

        {error && (
          <p className="text-danger">
            {error}
          </p>
        )}

        <Button
          variant="dark"
          type="submit"
          disabled={cargando}
          className="me-2"
        >
          {productoAEditar ? (
            <>
              <FaSave className="me-2" />
              {cargando
                ? 'Guardando...'
                : 'Actualizar producto'}
            </>
          ) : (
            <>
              <FaPlus className="me-2" />
              {cargando
                ? 'Guardando...'
                : 'Agregar producto'}
            </>
          )}
        </Button>

        {productoAEditar && (
          <Button
            variant="secondary"
            type="button"
            onClick={limpiarFormulario}
          >
            <FaTimes className="me-2" />
            Cancelar edición
          </Button>
        )}
      </Form>

      <hr className="my-5" />

      <h3 className="mb-4">
        Productos cargados
      </h3>

      {cargandoProductos ? (
        <div className="text-center py-4">
          <Spinner animation="border" />

          <p className="mt-3">
            Cargando productos...
          </p>
        </div>
      ) : (
        productos.map((producto) => (
          <div
            key={producto.id}
            className="border rounded p-3 mb-3"
          >
            <h4>{producto.nombre}</h4>

            <p className="mb-1">
              Precio: $
              {producto.precio.toLocaleString('es-AR')}
            </p>

            <p className="mb-1">
              Stock: {producto.stock}
            </p>

            <p>
              Categoría: {producto.categoria}
            </p>

            <Button
              variant="outline-warning"
              type="button"
              onClick={() => handleEditar(producto)}
              className="me-2"
            >
              <FaEdit className="me-2" />
              Editar
            </Button>

            <Button
              variant="outline-danger"
              type="button"
              onClick={() => abrirModalEliminar(producto)}
            >
              <FaTrash className="me-2" />
              Eliminar
            </Button>
          </div>
        ))
      )}

      <Modal
        show={Boolean(productoAEliminar)}
        onHide={cerrarModalEliminar}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Confirmar eliminación
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          ¿Seguro que querés eliminar{' '}
          <strong>
            {productoAEliminar?.nombre}
          </strong>
          ?
          <br />
          Esta acción no se puede deshacer.
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={cerrarModalEliminar}
            disabled={eliminando}
          >
            Cancelar
          </Button>

          <Button
            variant="danger"
            onClick={confirmarEliminacion}
            disabled={eliminando}
          >
            <FaTrash className="me-2" />

            {eliminando
              ? 'Eliminando...'
              : 'Eliminar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Administracion

