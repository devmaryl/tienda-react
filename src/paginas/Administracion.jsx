import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/config.js'

function Administracion() {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [categoria, setCategoria] = useState('')
  const [imagen, setImagen] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

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

    const nuevoProducto = {
      nombre: nombre.trim(),
      precio: Number(precio),
      stock: Number(stock),
      categoria: categoria.trim(),
      imagen: imagen.trim(),
      descripcion: descripcion.trim(),
    }

    try {
      setCargando(true)

      const productosRef = collection(db, 'productos')

      await addDoc(productosRef, nuevoProducto)

      alert('Producto agregado correctamente.')

      setNombre('')
      setPrecio('')
      setStock('')
      setCategoria('')
      setImagen('')
      setDescripcion('')
    } catch (error) {
      console.error('Error al agregar producto:', error)
      setError('No se pudo agregar el producto.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <section>
      <h2>Administración de productos</h2>

      <h3>Agregar producto</h3>

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
          {cargando ? 'Guardando...' : 'Agregar producto'}
        </button>
      </form>
    </section>
  )
}

export default Administracion
