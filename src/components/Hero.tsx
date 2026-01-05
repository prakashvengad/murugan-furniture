// File: components/Hero.tsx
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-amber-700 to-amber-900 text-white">
      <div className="container mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Transform Your Home with Quality Furniture
          </h1>
          <p className="text-xl mb-8 text-amber-100">
            Premium furniture & appliances at affordable prices. 5000+ satisfied customers since 1995.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-amber-800 px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-100 transition">
              View Collection
            </button>
            <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-800 transition">
              Book Consultation
            </button>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="relative rounded-xl overflow-hidden w-full h-96">
              <Image
                src="https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/homepage/home.png"
                alt="Murugan Furniture homepage"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 512px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}