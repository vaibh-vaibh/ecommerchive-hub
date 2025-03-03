
import { useState, useEffect } from 'react';
import ProductCard, { Product } from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 2 | 3 | 4;
}

const ProductGrid = ({ products, className, columns = 3 }: ProductGridProps) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Animate products in with a staggered effect
    const timer = setTimeout(() => {
      setVisibleProducts(products);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [products]);
  
  const columnsConfig = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };
  
  return (
    <div className={cn('grid gap-x-4 gap-y-10 md:gap-8', columnsConfig[columns], className)}>
      {visibleProducts.map((product, index) => (
        <div 
          key={product.id} 
          className="animate-slide-in-up"
          style={{ 
            animationDelay: `${index * 100}ms`,
            opacity: 0, 
            animation: 'slide-in-up 0.5s ease forwards',
            animationFillMode: 'forwards' 
          }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
