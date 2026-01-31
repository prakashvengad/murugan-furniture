// File: components/Hero.tsx
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-amber-700 to-amber-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content - Full width on mobile, half on desktop */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Transform Your Home with Quality Furniture
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-amber-100/90 leading-relaxed">
              Premium furniture & appliances at affordable prices. 5000+ satisfied customers since 1995.
            </p>
            
            {/* Buttons - Stack on small screens, row on medium+ */}
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
              <button 
                className="
                  w-full xs:w-auto
                  bg-white text-amber-800 
                  px-6 sm:px-8 py-3 sm:py-3.5 
                  rounded-lg font-semibold 
                  text-base sm:text-lg 
                  hover:bg-amber-100 
                  active:scale-[0.98]
                  transition-all duration-200
                  shadow-lg hover:shadow-xl
                "
              >
                View Collection
              </button>
              <button 
                className="
                  w-full xs:w-auto
                  bg-transparent border-2 border-white 
                  px-6 sm:px-8 py-3 sm:py-3.5 
                  rounded-lg font-semibold 
                  text-base sm:text-lg 
                  hover:bg-white/10 
                  active:scale-[0.98]
                  transition-all duration-200
                "
              >
                Book Consultation
              </button>
            </div>
            
            {/* Trust Indicators for mobile */}
            <div className="mt-8 sm:mt-10 md:hidden">
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-amber-200/80">Years</div>
                </div>
                <div className="h-8 w-px bg-amber-500/50"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5000+</div>
                  <div className="text-amber-200/80">Customers</div>
                </div>
                <div className="h-8 w-px bg-amber-500/50"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">⭐ 4.8</div>
                  <div className="text-amber-200/80">Rating</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image Section - Full width on mobile, half on desktop */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Image Container with responsive sizing */}
              <div className="
                relative 
                rounded-2xl sm:rounded-3xl 
                overflow-hidden 
                w-full 
                h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[480px]
                shadow-2xl
                border-8 sm:border-10 border-white/20
              ">
                <Image
                  src="https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/homepage/home.png"
                  alt="Murugan Furniture homepage - Modern living room furniture"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="
                absolute -top-4 -right-4 sm:-top-6 sm:-right-6
                w-20 h-20 sm:w-28 sm:h-28
                bg-amber-500/20 
                rounded-full 
                -z-10
              "></div>
              <div className="
                absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6
                w-16 h-16 sm:w-24 sm:h-24
                bg-amber-400/20 
                rounded-full 
                -z-10
              "></div>
            </div>
            
            {/* Trust Indicators for desktop */}
            <div className="hidden md:flex items-center justify-center mt-8 lg:mt-12 gap-8 lg:gap-12 text-amber-100">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold">25+</div>
                <div className="text-sm lg:text-base text-amber-200/80">Years Experience</div>
              </div>
              <div className="h-12 w-px bg-amber-500/50"></div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold">5000+</div>
                <div className="text-sm lg:text-base text-amber-200/80">Happy Customers</div>
              </div>
              <div className="h-12 w-px bg-amber-500/50"></div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold">⭐ 4.8</div>
                <div className="text-sm lg:text-base text-amber-200/80">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative wave for mobile */}
      <div className="absolute bottom-0 left-0 right-0 hidden sm:block">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
          className="w-full h-12 md:h-20"
          preserveAspectRatio="none"
        >
          <path 
            fill="white" 
            fillOpacity="0.05" 
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,165.3C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}