
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/ButtonLoading';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '@/components/products/ProductGrid';
import { PRODUCTS } from '@/data/products';

const Index = () => {
  // Get featured products for the homepage
  const featuredProducts = PRODUCTS.filter(product => product.featured).slice(0, 4);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" 
            alt="Modern living room" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="layout relative z-20 text-white">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="heading-1 mb-4">Designed for the Modern Home</h1>
            <p className="body-large mb-8 text-white/80">
              Curated collection of premium products that combine minimalist aesthetics with exceptional functionality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/about">
                  About Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="layout">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-slide-in-up" style={{ animationDelay: "100ms" }}>
              <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-black text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Crafted from the finest materials to ensure durability and timeless elegance.</p>
            </div>
            
            <div className="text-center p-6 animate-slide-in-up" style={{ animationDelay: "200ms" }}>
              <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-black text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="16" height="16" x="4" y="4" rx="2"></rect>
                  <rect width="6" height="6" x="9" y="9" rx="1"></rect>
                  <path d="M15 4v2"></path>
                  <path d="M15 18v2"></path>
                  <path d="M4 15h2"></path>
                  <path d="M18 15h2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Thoughtful Design</h3>
              <p className="text-muted-foreground">Every product is designed with purpose, balancing form and function seamlessly.</p>
            </div>
            
            <div className="text-center p-6 animate-slide-in-up" style={{ animationDelay: "300ms" }}>
              <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-black text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainable Approach</h3>
              <p className="text-muted-foreground">Committed to ethical production and environmental responsibility in every step.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-24">
        <div className="layout">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="heading-2 mb-4">Featured Products</h2>
              <p className="text-muted-foreground max-w-xl">
                Our selection of premium items, curated for those who appreciate exceptional quality and design.
              </p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link to="/products" className="group flex items-center">
                View All Products
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
          
          <ProductGrid products={featuredProducts} columns={4} />
        </div>
      </section>
      
      {/* Banner Section */}
      <section className="py-24 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-gray-800 to-gray-950 opacity-70"></div>
        <div className="layout relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6">Elevate Your Space</h2>
            <p className="body-large mb-8 text-gray-300">
              Our products are designed to bring elegance and functionality to your everyday life. 
              Discover the perfect balance of form and purpose.
            </p>
            <Button asChild size="lg" className="bg-white text-gray-950 hover:bg-gray-100">
              <Link to="/products">Explore Collection</Link>
            </Button>
          </div>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-24">
        <div className="layout">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-4">Join Our Newsletter</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to receive updates on new products, special offers, and design inspiration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button type="submit">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
