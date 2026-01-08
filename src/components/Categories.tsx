// File: components/Categories.tsx
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function Categories() {
  const categories = [
    { name: 'Living Room', href: '/SearchResults?category=Living%20Room', image: 'https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/Category/Living%20Room.png' },
    { name: 'Bedroom', href: '/SearchResults?category=Bedroom', image: 'https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/Category/bedroom.png' },
    { name: 'Dining & Kitchen', href: '/SearchResults?category=Dining%20%26%20Kitchen', image: 'https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/Category/Dining%20&%20Kitchen.png' },
    { name: 'Home Appliances', href: '/SearchResults?category=Home%20Appliances', image: 'https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/Category/Home%20Appliances.jpg' },
    { name: 'Office Furniture', href: '/SearchResults?category=Office%20Furniture', image: 'https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/Category/Office%20Furniture.jpg' },
    { name: 'Outdoor', href: '/SearchResults?category=Outdoor', image: 'https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/Category/Outdoor.png' },
  ];

  const supabase = await createClient();

  const counts = await Promise.all(
    categories.map(async (category) => {
      const { count, error } = await supabase
        .from('products')
        .select('id', { count: 'exact', head: true })
        .eq('category', category.name);

      if (error) return 0;
      return count ?? 0;
    }),
  );

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop By Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of premium furniture categories for every room in your home
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index} 
              href={category.href}
              className="bg-amber-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6 flex items-center">
                <div className="relative rounded-xl w-16 h-16 overflow-hidden bg-white">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                  )}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                  <p className="text-amber-700">{counts[index]} products</p>
                </div>
                <span className="ml-auto text-amber-700 hover:text-amber-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/Search"
            className="bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-900 transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}