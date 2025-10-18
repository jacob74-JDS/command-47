
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Product, Category } from '../types';
import { CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await api.getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center bg-base-200 p-12 rounded-lg">
        <h1 className="text-5xl font-extrabold text-white mb-4">Discover Premium UI Designs</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          High-quality, professionally crafted UI design templates and kits to accelerate your projects.
        </p>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((category: Category) => (
            <Link 
              key={category.slug} 
              to={`/category/${category.slug}`}
              className="bg-base-200 p-6 rounded-lg text-center transform hover:-translate-y-1 hover:bg-base-300 transition-all duration-300 group"
            >
              <category.icon className="h-12 w-12 mx-auto text-accent mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Featured Products</h2>
        {loading ? (
          <div className="text-center">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
