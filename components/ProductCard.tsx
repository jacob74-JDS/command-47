
import React from 'react';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    addToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <div className="bg-base-200 rounded-lg overflow-hidden shadow-xl transform hover:-translate-y-2 transition-transform duration-300 group">
      <div className="relative">
        <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-4 capitalize">{product.category}</p>
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-extrabold text-accent">${product.price}</p>
          <div className="flex items-center">
            <StarRating rating={product.rating} />
            <span className="text-gray-400 ml-2 text-sm">({product.rating})</span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
