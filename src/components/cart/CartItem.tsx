
import { useCart, CartItem as CartItemType } from '@/context/CartContext';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
  className?: string;
}

const CartItem = ({ item, className }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCart();
  
  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };
  
  return (
    <div className={cn('flex py-4 animate-fade-in', className)}>
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium">
            <h3>{item.name}</h3>
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              onClick={decrementQuantity}
            >
              <MinusCircle className="h-4 w-4" />
            </button>
            
            <span className="text-sm w-6 text-center">{item.quantity}</span>
            
            <button
              type="button"
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              onClick={incrementQuantity}
            >
              <PlusCircle className="h-4 w-4" />
            </button>
          </div>
          
          <button
            type="button"
            className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
