// components/search/constants.ts
export const CATEGORIES = [
  { name: 'Living Room', icon: '🛋️' },
  { name: 'Bedroom', icon: '🛏️' },
  { name: 'Dining & Kitchen', icon: '🍽️' },
  { name: 'Home Appliances', icon: '🔌' },
  { name: 'Office Furniture', icon: '🪑' },
  { name: 'Outdoor', icon: '🌿' }
];

export const FILTERS = [
  { name: "Category", options: ["Remote Control Cars", "Model Cars", "Car Decor", "Car Accessories", "Apparel", "Home Decor"] },
  { name: "Price", options: ["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "Above ₹2000"] },
  { name: "Discount", options: ["10% and above", "20% and above", "30% and above", "50% and above"] },
  { name: "Rating", options: ["4★ & above", "3★ & above", "2★ & above"] },
  { name: "Delivery", options: ["Free Delivery", "Express Delivery"] }
];

export const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "discount", label: "Discount" },
  { value: "rating", label: "Customer Rating" },
  { value: "newest", label: "Newest First" }
];

export const RELATED_SEARCHES = [
  'toy cars', 'car accessories', 'car decor', 'rc cars', 'model cars', 'car gifts'
];

export const getSafeImageSrc = (imageUrl?: string) => {
  if (
    typeof imageUrl === 'string' &&
    imageUrl.startsWith('https://') &&
    !imageUrl.includes('YOUR_IMAGE_URL')
  ) {
    return imageUrl;
  }

  return '/placeholder.png';
};
