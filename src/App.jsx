import { Routes, Route } from 'react-router-dom'

import Layout from './componentes/layout/Layout.jsx'
import Inicio from './paginas/Inicio.jsx'
import Productos from './paginas/Productos.jsx'
import ProductoDetalle from './paginas/ProductoDetalle.jsx'
import Carrito from './paginas/Carrito.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="productos" element={<Productos />} />
        <Route path="producto/:id" element={<ProductoDetalle />} />
        <Route path="carrito" element={<Carrito />} />
      </Route>
    </Routes>
  )
}

export default App