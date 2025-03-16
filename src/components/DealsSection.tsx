import React from 'react';
import { Clock } from 'lucide-react';

export const DealsSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">Today's Deals</h2>
          <Clock className="text-[#f08804]" size={20} />
        </div>
        <a href="#" className="text-[#007185] hover:text-[#c7511f] hover:underline">See all deals</a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="relative pb-[100%] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={`https://picsum.photos/400/400?random=${i}`}
                alt="Deal"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#f08804] text-white text-center py-1">
                Up to 40% off
              </div>
            </div>
            <div className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer">
              Deal of the Day
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};