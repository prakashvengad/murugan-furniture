// File: pages/index.js
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Services from '@/components/Services';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

// Force dynamic rendering since Categories component uses Supabase
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Murugan Furniture',
  description: 'Premium furniture and home appliances in Chennai since 1995',
  icons: {
    icon: 'https://ztoiiepzhkdyjuljyqyz.supabase.co/storage/v1/object/public/product-images/logo/murugan-furniture.png',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}