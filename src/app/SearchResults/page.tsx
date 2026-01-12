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
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const supabase = await createClient();

  const { category, q: query } = await searchParams;

  let supabaseQuery = supabase.from('products').select('*');

  // ✅ Apply category filter ONLY if it exists and is valid
  if (category && ALLOWED_CATEGORIES.includes(category)) {
    supabaseQuery = supabaseQuery.eq('category', category);
  }

  // ✅ Apply text search filter if query exists
  if (query && query.trim().length > 0) {
    supabaseQuery = supabaseQuery.ilike('name', `%${query.trim()}%`);
  }

  const { data: products, error } = await supabaseQuery;

  if (error) {
    console.error('Error fetching products:', error);
  }

  // Determine display title based on search parameters
  let displayTitle = 'All Categories';
  if (category && ALLOWED_CATEGORIES.includes(category)) {
    displayTitle = category;
  }
  if (query && query.trim().length > 0) {
    displayTitle = `Search: "${query.trim()}"`;
  }
  if (category && query) {
    displayTitle = `${category} - Search: "${query.trim()}"`;
  }

  return (
    <SearchResults
      initialProducts={products ?? []}
      category={displayTitle}
    />
  );
}
