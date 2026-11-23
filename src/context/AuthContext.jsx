import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  const auth = getAuth()

  const registrar = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const iniciarSesion = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const cerrarSesion = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const cancelarObservador = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual)
      setCargando(false)
    })

    return () => cancelarObservador()
  }, [auth])

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        registrar,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
