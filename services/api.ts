
import { products } from '../data/products';
import type { Product, User } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const api = {
  getProducts: async (category?: string): Promise<Product[]> => {
    await delay(500);
    if (category) {
      return products.filter(p => p.category === category);
    }
    return products;
  },
  getProductById: async (id: number): Promise<Product | undefined> => {
    await delay(300);
    return products.find(p => p.id === id);
  },
  getFeaturedProducts: async (): Promise<Product[]> => {
    await delay(500);
    // return a few from various categories
    return [products[0], products[4], products[6], products[8]];
  },
  login: async (email: string, password: string): Promise<User> => {
    await delay(1000);
    if (email === 'user@example.com' && password === 'password123') {
      return { id: '1', name: 'John Doe', email: 'user@example.com' };
    }
    throw new Error('Invalid credentials');
  },
  signup: async (name: string, email: string, password: string): Promise<User> => {
    await delay(1000);
    if (email === 'user@example.com') {
      throw new Error('Email already exists');
    }
    return { id: '2', name, email };
  },
};
