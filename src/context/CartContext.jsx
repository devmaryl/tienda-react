import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([])

  const addToCart = (producto) => {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id
      )

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [
        ...carritoActual,
        {
          ...producto,
          cantidad: 1,
        },
      ]
    })
  }

  const totalCantidad = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  )

  return (
    <CartContext.Provider
      value={{
        carrito,
        addToCart,
        totalCantidad,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
