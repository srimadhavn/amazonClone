import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
      <div className="relative pt-[100%] mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-medium line-clamp-2 mb-2">{product.title}</h3>
        
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(product.rating.rate) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
            />
          ))}
          <span className="ml-2 text-sm text-[#007185]">({product.rating.count})</span>
        </div>

        <div className="mb-4">
          <span className="text-sm">$</span>
          <span className="text-xl font-bold">{Math.floor(product.price)}</span>
          <span className="text-sm">{(product.price % 1).toFixed(2).slice(1)}</span>
        </div>

        {product.rating.count < 50 && (
          <div className="text-sm text-red-600 mb-2">Only {product.rating.count} left in stock</div>
        )}
      </div>

      <button
        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
        className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-sm py-2 px-4 rounded-full border border-[#fcd200]"
      >
        Add to Cart
      </button>
      
      <button className="mt-2 w-full bg-[#ffa41c] hover:bg-[#fa8900] text-sm py-2 px-4 rounded-full border border-[#ff8f00]">
        Buy Now
      </button>
    </div>
  );
};