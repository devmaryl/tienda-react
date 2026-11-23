import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config.js'
import Item from '../Item/Item.jsx'
import './ItemListContainer.css'

function ItemListContainer() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const productosDB = collection(db, 'productos')

    getDocs(productosDB)
      .then((respuesta) => {
        const productosFirebase = respuesta.docs.map((documento) => ({
          ...documento.data(),
          id: documento.id,
        }))

        setProductos(productosFirebase)
      })
      .catch(() => {
        setError('No se pudieron cargar los productos desde Firebase.')
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