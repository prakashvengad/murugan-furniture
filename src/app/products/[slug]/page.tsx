import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  original_price?: number;
  discount?: number;
  category: string;
  brand?: string;
  color?: string;
  ideal_for?: string;
  rating?: number;
  review_count?: number;
  stock_count?: number;
  is_new?: boolean;
  image_url?: string;
  seller?: {
    name: string;
    rating?: number;
    return_policy?: string;
  };
  details?: Record<string, any>;
  delivery?: {
    estimated_date?: string;
    cutoff_time?: string;
    cod_available?: boolean;
  };
}

interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  sort_order?: number;
}

async function getProduct(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      seller:seller_id(name, rating, return_policy)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !product) {
    return null;
  }

  return product;
}

async function getProductImages(productId: string): Promise<ProductImage[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching product images:', error);
    return [];
  }

  return data || [];
}

async function getRelatedProducts(category: string, currentProductId: string, limit = 8): Promise<Product[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .neq('id', currentProductId)
    .limit(limit);

  if (error) {
    console.error('Error fetching related products:', error);
    return [];
  }

  return data || [];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | Murugan Furniture',
      description: 'The requested product could not be found.',
    };
  }

  const title = `${product.name} | Murugan Furniture`;
  const description = product.description || `Shop ${product.name} at Murugan Furniture. Premium quality furniture at affordable prices.`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.image_url ? [product.image_url] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.image_url ? [product.image_url] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  
  if (!product) {
    notFound();
  }

  const productImages = await getProductImages(product.id);
  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return (
    <ProductDetailClient 
      product={product}
      productImages={productImages}
      relatedProducts={relatedProducts}
    />
  );
}
