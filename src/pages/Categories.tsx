
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PRODUCTS } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/ButtonLoading';
import { Grid3X3, List, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define all unique categories from our products
const CATEGORIES = Array.from(new Set(PRODUCTS.map(product => product.category)));

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory 
    ? PRODUCTS.filter(product => product.category === selectedCategory)
    : PRODUCTS;
    
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="mb-12 text-center">
          <h1 className="heading-2 mb-3">Product Categories</h1>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Browse our products by category to find exactly what you're looking for.
          </p>
        </div>
        
        {/* Category selector */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Categories</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                className={viewMode === 'grid' ? 'bg-secondary' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className={viewMode === 'list' ? 'bg-secondary' : ''}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* All categories button */}
            <button
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-lg transition-all",
                selectedCategory === null 
                  ? "bg-black text-white" 
                  : "bg-gray-100 hover:bg-gray-200"
              )}
              onClick={() => setSelectedCategory(null)}
            >
              <Tag className="h-8 w-8 mb-2" />
              <span className="font-medium">All Products</span>
              <span className="text-sm mt-1">{PRODUCTS.length} items</span>
            </button>
            
            {/* Individual category buttons */}
            {CATEGORIES.map(category => {
              const count = PRODUCTS.filter(p => p.category === category).length;
              return (
                <button
                  key={category}
                  className={cn(
                    "flex flex-col items-center justify-center p-6 rounded-lg transition-all",
                    selectedCategory === category 
                      ? "bg-black text-white" 
                      : "bg-gray-100 hover:bg-gray-200"
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  <Tag className="h-8 w-8 mb-2" />
                  <span className="font-medium">{category}</span>
                  <span className="text-sm mt-1">{count} items</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Products section */}
        <div className="mt-12">
          <h2 className="text-xl font-medium mb-6">
            {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({filteredProducts.length} items)
            </span>
          </h2>
          
          {viewMode === 'grid' ? (
            <ProductGrid products={filteredProducts} columns={3} />
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="flex border rounded-lg overflow-hidden">
                  <div className="w-32 h-32 flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                      <p className="text-sm line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/product/${product.id}`}>View Details</a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
