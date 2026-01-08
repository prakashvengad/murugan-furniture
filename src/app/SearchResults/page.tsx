import { createClient } from '@/utils/supabase/server';
import SearchResults from '@/components/SearchResults';

// Force dynamic rendering since this page uses Supabase
export const dynamic = 'force-dynamic';

// Optional: allowed categories (safe & clean)
const ALLOWED_CATEGORIES = [
  'Living Room',
  'Bedroom',
  'Dining & Kitchen',
  'Home Appliances',
  'Office Furniture',
  'Outdoor',
];

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const supabase = await createClient();

  const { category } = await searchParams;

  let query = supabase.from('products').select('*');

  // ✅ Apply category filter ONLY if it exists and is valid
  if (category && ALLOWED_CATEGORIES.includes(category)) {
    query = query.eq('category', category);
  }

  const { data: products, error } = await query;

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
