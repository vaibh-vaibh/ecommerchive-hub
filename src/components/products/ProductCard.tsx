
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/ButtonLoading';
import { ShoppingBag, Eye } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  description?: string;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden bg-white", 
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <div className="image-hover aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Hover actions */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/5 flex items-center justify-center gap-2 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <Button 
              size="icon" 
              className="rounded-full bg-white text-black hover:bg-white/90 transition-transform duration-300 transform-gpu scale-90 group-hover:scale-100"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Add to cart</span>
            </Button>
            
            <Link 
              to={`/product/${product.id}`} 
              className="rounded-full bg-white text-black hover:bg-white/90 p-2.5 transition-transform duration-300 transform-gpu scale-90 group-hover:scale-100"
            >
              <Eye className="h-5 w-5" />
              <span className="sr-only">View details</span>
            </Link>
          </div>
        </div>
        
        <div className="px-1">
          <span className="text-xs text-gray-500 uppercase mb-1 block">{product.category}</span>
          <h3 className="font-medium text-base mb-1 transition-colors group-hover:text-black">{product.name}</h3>
          <p className="font-medium">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
