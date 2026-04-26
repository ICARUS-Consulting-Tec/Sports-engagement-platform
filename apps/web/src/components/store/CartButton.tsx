import { Button, Badge } from '@heroui/react';
import { useCart } from '../../context/CartContext';
import cartIcon from '../../assets/icons/cart.svg';

export default function CartButton() {
  const { openCart, cartItemCount } = useCart();

  return (
    <Badge 
      content={cartItemCount} 
      color="danger" 
      isInvisible={cartItemCount === 0}
      shape="circle"
    >
      <Button
        isIconOnly
        color="primary"
        variant="flat"
        onPress={openCart}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50"
      >
        <img src={cartIcon} alt="Cart" className="w-6 h-6" />
      </Button>
    </Badge>
  );
}