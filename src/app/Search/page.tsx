import { createClient } from '@/utils/supabase/server';
import SearchResults from '@/components/SearchResults';

// Force dynamic rendering since this page uses Supabase
export const dynamic = 'force-dynamic';

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const supabase = await createClient();

  const { category } = await searchParams;

  let productsQuery = supabase.from('products').select('*');

  // ✅ If category exists → filter
  if (category) {
    productsQuery = productsQuery.eq('category', category);
  }

  const { data: products, error } = await productsQuery;

  if (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <SearchResults
      initialProducts={products ?? []}
      category={category ?? 'All Categories'}
    />
  );
}
