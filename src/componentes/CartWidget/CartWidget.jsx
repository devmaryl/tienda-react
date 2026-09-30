import { useCart } from '../../context/CartContext.jsx'

function CartWidget() {
  const { totalCantidad } = useCart()

  return (
    <span>
      🛒 {totalCantidad}
    </span>
  )
}

export default CartWidget
