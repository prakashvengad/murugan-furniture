// File: components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-amber-800 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative w-16 h-16 overflow-hidden rounded-xl bg-white">

            <Image
              src="/logo.png"
              alt="Murugan Furniture logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold">Murugan Furniture</h1>
            <p className="text-amber-200 text-sm">Since 1995</p>
          </div>
        </div>
        
        <nav className="w-full md:w-auto">
          <ul className="flex flex-wrap justify-center gap-x-1 gap-y-2 sm:gap-x-3 md:gap-x-6 font-medium">
            {['Home', 'Products', 'Categories', 'Services', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link href={`#${item.toLowerCase()}`} className="px-3 py-2 hover:bg-amber-700 rounded transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-4 md:mt-0 flex items-center w-full md:w-auto justify-center md:justify-end">
          <button className="bg-white text-amber-800 px-4 py-2 rounded-lg font-medium hover:bg-amber-100 transition w-full sm:w-auto">
            Call: +91 98765 43210
          </button>
        </div>
      </div>
    </header>
  );
}