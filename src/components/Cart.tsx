import React from 'react';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold">Your Amazon Cart is empty</h2>
        <p className="mt-2 text-gray-600">
          Shop today's deals
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      
      {state.items.map(item => (
        <div key={item.id} className="flex items-center py-4 border-b">
          <img
            src={item.image}
            alt={item.title}
            className="w-24 h-24 object-contain"
          />
          
          <div className="ml-4 flex-1">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-green-600 text-sm">In Stock</p>
            
            <div className="mt-2 flex items-center">
              <select
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="border rounded-md px-2 py-1"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Qty: {i + 1}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                className="ml-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <Trash2 size={16} className="mr-1" /> Delete
              </button>
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-lg font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      ))}
      
      <div className="mt-6 text-right">
        <div className="text-2xl font-bold">
          Subtotal ({state.items.reduce((acc, item) => acc + item.quantity, 0)} items):
          <span className="ml-2">${state.total.toFixed(2)}</span>
        </div>
        
        <button className="mt-4 bg-[#f0c14b] hover:bg-[#ddb347] py-2 px-8 rounded-md border border-[#a88734]">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};