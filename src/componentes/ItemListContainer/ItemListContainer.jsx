import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config.js'
import Item from '../Item/Item.jsx'
import './ItemListContainer.css'

function ItemListContainer() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const productosPorPagina = 3

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true)
        setError(null)

        const productosDB = collection(db, 'productos')
        const respuesta = await getDocs(productosDB)

        const productosFirebase = respuesta.docs.map((documento) => ({
          ...documento.data(),
          id: documento.id,
        }))

        setProductos(productosFirebase)
      } catch (error) {
        console.error('Error al cargar productos:', error)
        setError('No se pudieron cargar los productos desde Firebase.')
      } finally {
        setCargando(false)
      }
    }

    cargarProductos()
  }, [])

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  )

  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  )

  const indiceInicial =
    (paginaActual - 1) * productosPorPagina

  const indiceFinal =
    indiceInicial + productosPorPagina

  const productosPagina = productosFiltrados.slice(
    indiceInicial,
    indiceFinal
  )

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value)
    setPaginaActual(1)
  }

  const paginaAnterior = () => {
    setPaginaActual((pagina) =>
      Math.max(pagina - 1, 1)
    )
  }

  const paginaSiguiente = () => {
    setPaginaActual((pagina) =>
      Math.min(pagina + 1, totalPaginas)
    )
  }

  if (cargando) {
    return <p>Cargando productos...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <section className="productos-section">
      <h2>Nuestros productos</h2>

      <input
        type="search"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={handleBusqueda}
        aria-label="Buscar productos por nombre"
      />

      {productosFiltrados.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <>
          <div className="productos-grid">
            {productosPagina.map((producto) => (
              <Item
                key={producto.id}
                producto={producto}
              />
            ))}
          </div>

          {totalPaginas > 1 && (
            <div>
              <button
                type="button"
                onClick={paginaAnterior}
                disabled={paginaActual === 1}
              >
                Anterior
              </button>

              <span>
                {' '}
                Página {paginaActual} de {totalPaginas}{' '}
              </span>

              <button
                type="button"
                onClick={paginaSiguiente}
                disabled={paginaActual === totalPaginas}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default ItemListContainer
