-- Create GIN index for full-text search on products table
-- This index will improve performance for text search queries using ilike

-- Create GIN index on the name column for efficient text search
create index products_name_search_idx
on products using gin (to_tsvector('english', name));

-- Optional: If you need to search across multiple columns (name + description)
-- create index products_fulltext_search_idx
-- on products using gin (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '')));

-- To check if the index is being used, you can run:
-- EXPLAIN ANALYZE SELECT * FROM products WHERE name ilike '%sofa%';

-- To drop the index if needed:
-- drop index products_name_search_idx;
