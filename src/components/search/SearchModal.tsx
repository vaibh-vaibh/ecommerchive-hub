
import { useState, useEffect, useRef } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { SearchIcon, X } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof PRODUCTS>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus the input when the modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle search query change
  useEffect(() => {
    if (searchQuery.length > 1) {
      const query = searchQuery.toLowerCase();
      const results = PRODUCTS.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Navigate to product detail and close modal
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    onClose();
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 sm:pt-24">
        <div 
          className="bg-white w-full max-w-xl rounded-lg shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <div className="flex items-center border-b">
              <SearchIcon className="absolute left-4 h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 pl-12 pr-10 focus:outline-none text-base"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </div>
            
            {searchResults.length > 0 ? (
              <div className="max-h-96 overflow-y-auto py-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 mr-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </div>
                    <div className="ml-auto font-medium">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery.length > 1 ? (
              <div className="p-4 text-center text-gray-500">
                No products found matching "{searchQuery}"
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}></div>
    </Dialog>
  );
};

export default SearchModal;
