import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
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
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />

        <p className="mt-3">
          Cargando productos...
        </p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <p>{error}</p>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">
        Nuestros productos
      </h2>

      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} lg={6}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>

            <Form.Control
              type="search"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={handleBusqueda}
              aria-label="Buscar productos por nombre"
            />
          </InputGroup>
        </Col>
      </Row>

      {productosFiltrados.length === 0 ? (
        <p className="text-center">
          No se encontraron productos.
        </p>
      ) : (
        <>
          <Row className="g-4">
            {productosPagina.map((producto) => (
              <Col
                key={producto.id}
                xs={12}
                md={6}
                lg={4}
              >
                <Item producto={producto} />
              </Col>
            ))}
          </Row>

          {totalPaginas > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
              <Button
                variant="outline-primary"
                type="button"
                onClick={paginaAnterior}
                disabled={paginaActual === 1}
              >
                Anterior
              </Button>

              <span>
                Página {paginaActual} de {totalPaginas}
              </span>

              <Button
                variant="outline-primary"
                type="button"
                onClick={paginaSiguiente}
                disabled={paginaActual === totalPaginas}
              >
                Siguiente
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  )
}

export default ItemListContainer
