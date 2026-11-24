import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import styled from 'styled-components'

const TarjetaProducto = styled(Card)`
  height: 100%;
  border: none;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);
  }
`

const ImagenProducto = styled(Card.Img)`
  height: 220px;
  object-fit: contain;
  padding: 18px;
  background-color: #ffffff;
`

const BotonDetalle = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
  padding: 10px 16px;
  border-radius: 8px;
  background-color: #1f2937;
  color: white;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: #374151;
    color: white;
    transform: translateY(-2px);
  }
`

function Item({ producto }) {
  return (
    <TarjetaProducto>
      <ImagenProducto
        variant="top"
        src={producto.imagen}
        alt={producto.nombre}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>
          {producto.nombre}
        </Card.Title>

        <Card.Text className="fw-bold fs-5">
          ${producto.precio.toLocaleString('es-AR')}
        </Card.Text>

        <Card.Text>
          Stock: {producto.stock}
        </Card.Text>

        {producto.categoria && (
          <Card.Text className="text-muted">
            {producto.categoria}
          </Card.Text>
        )}

        <BotonDetalle
          to={`/producto/${producto.id}`}
          aria-label={`Ver detalle de ${producto.nombre}`}
        >
          <FaEye />
          Ver detalle
        </BotonDetalle>
      </Card.Body>
    </TarjetaProducto>
  )
}

export default Item

