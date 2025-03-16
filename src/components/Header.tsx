import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { state } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  return (
    <header className="bg-[#131921] text-white py-2 px-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold">Amazon</h1>
            <button className="lg:hidden">
              <Menu size={24} />
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-sm">
            <MapPin size={18} />
            <div>
              <div className="text-gray-300">Deliver to</div>
              <div className="font-bold">Chennai 600044</div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex">
                <select 
                  className="px-2 py-2 bg-gray-100 text-black rounded-l-lg border-r border-gray-300"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="electronics">Electronics</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="men's clothing">Men's Fashion</option>
                  <option value="women's clothing">Women's Fashion</option>
                  <option value="books">Books</option>
                  <option value="toys">Toys & Games</option>
                </select>
                <input
                  type="text"
                  placeholder="Search Amazon"
                  className="w-full py-2 px-4 text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-[#febd69] hover:bg-[#f3a847] px-6 rounded-r-lg"
                >
                  <Search size={20} className="text-black" />
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:block group relative">
              <div className="cursor-pointer">
                <div className="text-sm">Hello, Sign in</div>
                <div className="font-bold">Account & Lists</div>
              </div>
              <div className="hidden group-hover:block absolute top-full right-0 w-64 bg-white text-black shadow-lg rounded-lg p-4 mt-2">
                <div className="mb-4">
                  <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-lg">
                    Sign in
                  </button>
                  <p className="text-sm mt-2">
                    New customer? <a href="#" className="text-[#007185] hover:text-[#c7511f] hover:underline">Start here</a>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">Your Lists</h4>
                    <ul className="text-sm space-y-2">
                      <li><a href="#" className="hover:text-[#c7511f] hover:underline">Create a List</a></li>
                      <li><a href="#" className="hover:text-[#c7511f] hover:underline">Find a List</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Your Account</h4>
                    <ul className="text-sm space-y-2">
                      <li><a href="#" className="hover:text-[#c7511f] hover:underline">Account</a></li>
                      <li><a href="#" className="hover:text-[#c7511f] hover:underline">Orders</a></li>
                      <li><a href="#" className="hover:text-[#c7511f] hover:underline">Recommendations</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="text-sm">Returns</div>
              <div className="font-bold">& Orders</div>
            </div>

            <div className="relative group">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-[#f08804] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {state.items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
              <div className="hidden group-hover:block absolute top-full right-0 w-80 bg-white text-black shadow-lg rounded-lg p-4 mt-2">
                {state.items.length === 0 ? (
                  <p className="text-center">Your cart is empty</p>
                ) : (
                  <div>
                    <div className="max-h-64 overflow-y-auto">
                      {state.items.map(item => (
                        <div key={item.id} className="flex items-center gap-2 mb-2 pb-2 border-b">
                          <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
                          <div className="flex-1">
                            <p className="text-sm line-clamp-1">{item.title}</p>
                            <p className="text-sm font-bold">${item.price}</p>
                            <p className="text-xs">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <div className="text-right mb-2">
                        <span className="font-bold">Subtotal: ${state.total.toFixed(2)}</span>
                      </div>
                      <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-lg">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};