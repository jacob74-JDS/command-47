
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const cartTotal = getCartTotal();

  return (
    <div className="bg-base-200 p-8 rounded-lg shadow-2xl">
      <h1 className="text-4xl font-extrabold text-white mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400 mb-4">Your cart is empty.</p>
          <Link to="/" className="bg-accent hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-base-300 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div>
                      <h2 className="text-lg font-bold text-white">{item.name}</h2>
                      <p className="text-gray-400">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                     <p className="text-white">Qty: {item.quantity}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-error transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/3 bg-base-300 p-6 rounded-lg h-fit">
            <h2 className="text-2xl font-bold text-white mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-300 mb-2">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300 mb-4">
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t border-gray-600 pt-4 mb-4">
              <div className="flex justify-between text-white font-bold text-xl">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-accent hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
