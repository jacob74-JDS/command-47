
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../constants';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const category = CATEGORIES.find(c => c.slug === categoryName);

  useEffect(() => {
    const fetchProducts = async () => {
      if (categoryName) {
        try {
          setLoading(true);
          const categoryProducts = await api.getProducts(categoryName);
          setProducts(categoryProducts);
        } catch (error) {
          console.error(`Failed to fetch products for category ${categoryName}:`, error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProducts();
  }, [categoryName]);

  if (loading) {
    return <div className="text-center text-xl">Loading products...</div>;
  }
  
  if (!category) {
      return <div className="text-center text-xl text-error">Category not found.</div>
  }

  return (
    <div>
      <div className="bg-base-200 p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-2">{category.name}</h1>
        <p className="text-lg text-gray-300">{category.description}</p>
      </div>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg">No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
