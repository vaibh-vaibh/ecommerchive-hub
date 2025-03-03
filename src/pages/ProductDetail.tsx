
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Product } from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Minus, Plus, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRODUCTS } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find product by ID from our mock data
      const foundProduct = PRODUCTS.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image);
      }
      
      setIsLoading(false);
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };
  
  const incrementQuantity = () => setQuantity(qty => qty + 1);
  const decrementQuantity = () => setQuantity(qty => Math.max(1, qty - 1));
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin-slow">
            <div className="h-12 w-12 border-4 border-gray-200 border-t-black rounded-full" />
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!product) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="heading-2 mb-4">Product Not Found</h1>
          <p className="body text-muted-foreground mb-6">
            The product you are looking for does not exist.
          </p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Generate fake image gallery if none provided
  const images = product.images || [
    product.image,
    `https://source.unsplash.com/random/300x400?${product.category}&q=80&random=1`,
    `https://source.unsplash.com/random/300x400?${product.category}&q=80&random=2`,
  ];
  
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="layout">
          {/* Back button */}
          <Link 
            to="/products" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-md overflow-hidden aspect-square">
                <img 
                  src={selectedImage} 
                  alt={product.name}
                  className="w-full h-full object-cover animate-fade-in"
                />
              </div>
              
              {/* Image thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all",
                      selectedImage === img ? "border-black" : "border-transparent"
                    )}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="animate-slide-in-up">
              <div className="mb-2">
                <span className="text-sm uppercase text-muted-foreground">{product.category}</span>
              </div>
              <h1 className="heading-2 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className="h-4 w-4" 
                      fill={star <= 4 ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(24 reviews)</span>
              </div>
              
              <div className="mb-6">
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              </div>
              
              <div className="mb-8">
                <p className="text-muted-foreground mb-4">
                  {product.description || 
                    "A premium product designed with attention to detail and quality materials. Perfect for those who appreciate minimalist aesthetics and functional design."}
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block h-2 w-2 rounded-full bg-black mt-1.5 mr-2"></span>
                    Premium quality materials
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-2 w-2 rounded-full bg-black mt-1.5 mr-2"></span>
                    Designed for everyday use
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-2 w-2 rounded-full bg-black mt-1.5 mr-2"></span>
                    Free shipping on all orders
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-b py-6 mb-6">
                <div className="flex items-center gap-6">
                  {/* Quantity selector */}
                  <div className="flex items-center">
                    <button 
                      onClick={decrementQuantity}
                      className="p-2 border rounded-l-md hover:bg-gray-50 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center border-t border-b py-2">
                      {quantity}
                    </span>
                    <button 
                      onClick={incrementQuantity}
                      className="p-2 border rounded-r-md hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Add to cart button */}
                  <Button 
                    className="flex-1"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Product Details</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>SKU: {product.id}</p>
                  <p>Category: {product.category}</p>
                  <p>In Stock: Yes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
