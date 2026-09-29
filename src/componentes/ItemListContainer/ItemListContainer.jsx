import { useEffect, useState } from 'react'
import Item from '../Item/Item'
import './ItemListContainer.css'

function ItemListContainer() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/data/productos.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar los productos')
        }

        return respuesta.json()
      })
      .then((datos) => {
        setProductos(datos)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setCargando(false)
      })
  }, [])

  if (cargando) {
    return <p>Cargando productos...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <section className="productos-section">
      <h2>Nuestros productos</h2>

      <div className="productos-grid">
        {productos.map((producto) => (
          <Item
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>
    </section>
  )
}

export default ItemListContainer