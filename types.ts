
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
  description: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CartItem extends Product {
  quantity: number;
}
