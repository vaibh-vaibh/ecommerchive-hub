
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/ButtonLoading';
import SearchModal from '@/components/search/SearchModal';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Open search on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      
      // Close search on Escape
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeydown);
    
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);
  
  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };
  
  const handleContinueShopping = () => {
    setIsMobileMenuOpen(false);
    navigate('/products');
  };
  
  return (
    <>
      <header 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="layout py-4 md:py-6 flex items-center justify-between">
          <Link to="/" className="relative z-10">
            <h1 className="text-2xl font-bold">MONOLITH</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-black",
                  location.pathname === link.path ? "text-black" : "text-gray-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-1" 
              aria-label="Search"
              onClick={handleSearchClick}
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline text-sm text-gray-500">
                Search
                <span className="ml-2 text-xs py-0.5 px-1.5 bg-gray-100 rounded text-gray-500">⌘K</span>
              </span>
            </button>
            
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Shopping cart"
              onClick={openCart}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors block md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        <div 
          className={cn(
            "fixed inset-0 bg-white z-40 transition-transform duration-300 pt-20 px-4 md:hidden",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav className="flex flex-col space-y-6 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-lg font-medium py-2 border-b border-gray-100 transition-colors",
                  location.pathname === link.path ? "text-black" : "text-gray-600"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Button className="w-full" onClick={() => {
                openCart();
                setIsMobileMenuOpen(false);
              }}>
                View Cart ({cartCount})
              </Button>
              
              <Button variant="outline" className="w-full mt-2" onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
            </div>
          </nav>
        </div>
      </header>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
