import { Route, Routes } from 'react-router-dom'
import Layout from './componentes/layout/Layout.jsx'
import Inicio from './paginas/Inicio.jsx'
import Productos from './paginas/Productos.jsx'
import ProductoDetalle from './paginas/ProductoDetalle.jsx'
import Carrito from './paginas/Carrito.jsx'
import Administracion from './paginas/Administracion.jsx'
import Login from './componentes/Login/Login.jsx'
import Registro from './componentes/Registro/Registro.jsx'
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute.jsx'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<Inicio />}
        />

        <Route
          path="productos"
          element={<Productos />}
        />

        <Route
          path="producto/:id"
          element={<ProductoDetalle />}
        />

        <Route
          path="carrito"
          element={<Carrito />}
        />

        <Route
          path="login"
          element={<Login />}
        />

        <Route
          path="registro"
          element={<Registro />}
        />

        <Route
          path="administracion"
          element={
            <ProtectedRoute>
              <Administracion />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App

