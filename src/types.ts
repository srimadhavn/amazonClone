export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterOptions {
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  inStock: boolean;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';