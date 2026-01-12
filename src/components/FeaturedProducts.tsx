// File: components/FeaturedProducts.tsx
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
}

export default async function FeaturedProducts() {
  let products: Product[] = [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('id, name, category, price, image_url')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured products:', error);
    } else {
      products = data || [];
    }
  } catch (error) {
    console.error('Error fetching featured products:', error);
  }

  return (
    <section id="products" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our handpicked selection of premium furniture and appliances
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mx-auto max-w-md mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">No products available</h3>
            <p className="text-gray-500">Check back soon for our latest featured products!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group cursor-pointer">
                <div className="relative">
                  <div className="aspect-square overflow-hidden relative">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 border-2 border-dashed rounded-t-xl flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                    <span className="text-white text-sm font-medium">View Details</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mb-1">
                    {product.name}
                  </h3>
                  <span className="text-xs text-amber-700 font-medium">{product.category}</span>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>
                    <button className="bg-amber-800 text-white p-2 rounded-full hover:bg-pink-700 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button className="bg-amber-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-800 transition">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}