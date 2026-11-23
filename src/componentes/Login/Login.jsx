import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setCargando(true)

    try {
      await iniciarSesion(email, password)
      navigate('/')
    } catch (error) {
      console.error(error)
      setError('Correo electrónico o contraseña incorrectos.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <section>
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Correo electrónico
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            Contraseña
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button
          type="submit"
          disabled={cargando}
        >
          {cargando ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>

      <p>
        ¿No tenés una cuenta?{' '}
        <Link to="/registro">
          Registrate
        </Link>
      </p>
    </section>
  )
}

export default Login
