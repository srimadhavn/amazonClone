import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CategoryProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export const Categories: React.FC<CategoryProps> = ({ onSelectCategory, selectedCategory }) => {
  const categories = [
    "All",
    "Electronics",
    "Jewelery",
    "Men's Clothing",
    "Women's Clothing"
  ];

  return (
    <div className="bg-[#232f3e] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-6 overflow-x-auto py-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category === "All" ? "" : category.toLowerCase())}
              className={`whitespace-nowrap py-1 px-3 rounded-full text-sm transition-colors
                ${selectedCategory === (category === "All" ? "" : category.toLowerCase())
                  ? "bg-white text-[#232f3e]"
                  : "hover:bg-white/10"
                }`}
            >
              <div className="flex items-center">
                {category}
                <ChevronRight size={16} className="ml-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};