
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/ButtonLoading';
import { Product } from '@/components/products/ProductCard';
import { Filter, Sliders, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRODUCTS } from '@/data/products';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Accessories'];
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSortOption, setActiveSortOption] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const location = useLocation();
  
  useEffect(() => {
    // Simulate loading from API
    const loadProducts = async () => {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // For now, we're using mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProducts(PRODUCTS);
      setFilteredProducts(PRODUCTS);
      setIsLoading(false);
    };
    
    loadProducts();
  }, []);
  
  useEffect(() => {
    // Extract any filter parameters from the URL
    const params = new URLSearchParams(location.search);
    const filterParam = params.get('filter');
    
    if (filterParam) {
      // Handle specific filter presets here
      if (filterParam === 'new') {
        // In a real app, you would apply the appropriate filter
        console.log('Filtering by new arrivals');
      }
    }
  }, [location]);
  
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (activeCategory !== 'All') {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Apply sorting
    switch (activeSortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming we have a dateAdded field in a real app
        // For now, just randomize the order
        result.sort(() => Math.random() - 0.5);
        break;
      case 'featured':
      default:
        // Sort featured items first
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }
    
    setFilteredProducts(result);
  }, [products, activeCategory, activeSortOption]);
  
  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };
  
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
  
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="mb-12 text-center">
          <h1 className="heading-2 mb-3">Our Products</h1>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Discover our collection of premium products, crafted for the modern individual.
          </p>
        </div>
        
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* Mobile filter button */}
          <Button
            variant="outline"
            className="md:hidden flex items-center gap-2"
            onClick={toggleMobileFilters}
          >
            <Filter className="h-4 w-4" />
            Filters & Sort
          </Button>
          
          {/* Desktop category filters */}
          <div className="hidden md:flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Desktop sort options */}
          <div className="hidden md:flex items-center gap-2">
            <Sliders className="h-4 w-4 text-muted-foreground" />
            <select
              value={activeSortOption}
              onChange={(e) => setActiveSortOption(e.target.value)}
              className="border-none bg-transparent text-sm focus:ring-0 cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Mobile filters panel */}
        <div
          className={cn(
            "fixed inset-0 bg-white z-50 p-6 md:hidden transition-transform duration-300",
            isMobileFiltersOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Filters & Sort</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileFilters}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Sort By</h3>
              <div className="space-y-2">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-sm",
                      activeSortOption === option.value
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                    onClick={() => {
                      setActiveSortOption(option.value);
                      toggleMobileFilters();
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <Button
              className="w-full"
              onClick={toggleMobileFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
        
        {/* Products count */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>
        </div>
        
        {/* Product grid */}
        <ProductGrid products={filteredProducts} columns={3} />
      </div>
    </Layout>
  );
};

export default Products;
