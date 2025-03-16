import React from 'react';
import { Product } from '../types';
import { Star } from 'lucide-react';

interface RecommendationsProps {
  products: Product[];
  currentProduct?: Product;
}

export const Recommendations: React.FC<RecommendationsProps> = ({ products, currentProduct }) => {
  const getRecommendations = () => {
    if (!currentProduct) return products.slice(0, 4);
    
    return products
      .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 4);
  };

  const recommendations = getRecommendations();

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Recommended for you</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="relative pt-[100%] mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="absolute top-0 left-0 w-full h-full object-contain p-2"
              />
            </div>
            <h3 className="text-sm font-medium line-clamp-2 mb-2">{product.title}</h3>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating.rate) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
              <span className="ml-1 text-xs text-[#007185]">({product.rating.count})</span>
            </div>
            <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};