// File: pages/index.js
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Services from '@/components/Services';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Head>
        <title>Murugan Furniture & Home Appliances</title>
        <meta name="description" content="Premium furniture and home appliances in Chennai since 1995" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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