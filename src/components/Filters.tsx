import React from 'react';
import { Star } from 'lucide-react';
import { FilterOptions } from '../types';

interface FiltersProps {
  options: FilterOptions;
  onFilterChange: (options: FilterOptions) => void;
  minPrice: number;
  maxPrice: number;
}

export const Filters: React.FC<FiltersProps> = ({
  options,
  onFilterChange,
  minPrice,
  maxPrice,
}) => {
  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({
      ...options,
      priceRange: { min, max },
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...options,
      rating,
    });
  };

  const handleStockChange = (inStock: boolean) => {
    onFilterChange({
      ...options,
      inStock,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Price</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={options.priceRange.min}
            onChange={(e) => handlePriceChange(Number(e.target.value), options.priceRange.max)}
            min={minPrice}
            max={options.priceRange.max}
            className="w-24 px-2 py-1 border rounded"
          />
          <span>to</span>
          <input
            type="number"
            value={options.priceRange.max}
            onChange={(e) => handlePriceChange(options.priceRange.min, Number(e.target.value))}
            min={options.priceRange.min}
            max={maxPrice}
            className="w-24 px-2 py-1 border rounded"
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Customer Rating</h4>
        {[4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center mb-2">
            <input
              type="radio"
              id={`rating-${rating}`}
              checked={options.rating === rating}
              onChange={() => handleRatingChange(rating)}
              className="mr-2"
            />
            <label htmlFor={`rating-${rating}`} className="flex items-center">
              {[...Array(rating)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-400 fill-current"
                />
              ))}
              <span className="ml-1">& Up</span>
            </label>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-medium mb-2">Availability</h4>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="in-stock"
            checked={options.inStock}
            onChange={(e) => handleStockChange(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="in-stock">Include Out of Stock</label>
        </div>
      </div>
    </div>
  );
};