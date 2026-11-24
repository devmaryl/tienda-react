import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase/config.js'

function Administracion() {
  const [productos, setProductos] = useState([])
  const [productoAEditar, setProductoAEditar] = useState(null)

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [categoria, setCategoria] = useState('')
  const [imagen, setImagen] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const [cargando, setCargando] = useState(false)
  const [cargandoProductos, setCargandoProductos] = useState(true)
  const [error, setError] = useState('')

  const cargarProductos = async () => {
    try {
      setCargandoProductos(true)

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

  const handleEliminar = async (producto) => {
    const confirmacion = window.confirm(
      `¿Seguro que querés eliminar "${producto.nombre}"?`
    )

    if (!confirmacion) {
      return
    }

    try {
      const productoRef = doc(
        db,
        'productos',
        producto.id
      )

      await deleteDoc(productoRef)

      if (productoAEditar?.id === producto.id) {
        limpiarFormulario()
      }

      await cargarProductos()

      alert('Producto eliminado correctamente.')
    } catch (error) {
      console.error('Error al eliminar producto:', error)
      setError('No se pudo eliminar el producto.')
    }
  }

  return (
    <section>
      <h2>Administración de productos</h2>

      <h3>
        {productoAEditar
          ? 'Editar producto'
          : 'Agregar producto'}
      </h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">
            Nombre
          </label>

          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="precio">
            Precio
          </label>

          <input
            id="precio"
            type="number"
            min="1"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="stock">
            Stock
          </label>

          <input
            id="stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="categoria">
            Categoría
          </label>

          <input
            id="categoria"
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="imagen">
            Ruta de imagen
          </label>

          <input
            id="imagen"
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="descripcion">
            Descripción
          </label>

          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button
          type="submit"
          disabled={cargando}
        >
          {cargando
            ? 'Guardando...'
            : productoAEditar
              ? 'Actualizar producto'
              : 'Agregar producto'}
        </button>

        {productoAEditar && (
          <button
            type="button"
            onClick={limpiarFormulario}
          >
            Cancelar edición
          </button>
        )}
      </form>

      <hr />

      <h3>Productos cargados</h3>

      {cargandoProductos ? (
        <p>Cargando productos...</p>
      ) : (
        productos.map((producto) => (
          <article key={producto.id}>
            <h4>{producto.nombre}</h4>

            <p>
              Precio: $
              {producto.precio.toLocaleString('es-AR')}
            </p>

            <p>Stock: {producto.stock}</p>

            <p>Categoría: {producto.categoria}</p>

            <button
              type="button"
              onClick={() => handleEditar(producto)}
            >
              Editar
            </button>

            <button
              type="button"
              onClick={() => handleEliminar(producto)}
            >
              Eliminar
            </button>

            <hr />
          </article>
        ))
      )}
    </section>
  )
}

export default Administracion
