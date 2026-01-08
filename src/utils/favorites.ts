interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price: number;
  discount: number;
  rating: number;
  review_count: number;
  image_url: string;
  free_delivery: boolean;
  is_new: boolean;
  category: string;
}

const FAVORITES_KEY = 'murugan_furniture_favorites';

export const getFavorites = (): Product[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addToFavorites = (product: Product): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const favorites = getFavorites();
    const existingIndex = favorites.findIndex(item => item.id === product.id);
    
    if (existingIndex === -1) {
      favorites.push(product);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const removeFromFavorites = (productId: number): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const favorites = getFavorites();
    const filteredFavorites = favorites.filter(item => item.id !== productId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filteredFavorites));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

export const isFavorite = (productId: number): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const favorites = getFavorites();
    return favorites.some(item => item.id === productId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

export const toggleFavorite = (product: Product): void => {
  if (isFavorite(product.id)) {
    removeFromFavorites(product.id);
  } else {
    addToFavorites(product);
  }
};

export type { Product };
