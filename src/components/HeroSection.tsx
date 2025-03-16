import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=2000&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100" />
      </div>
      
      <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg">
        <ChevronLeft size={24} />
      </button>
      
      <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg">
        <ChevronRight size={24} />
      </button>
    </div>
  );
};