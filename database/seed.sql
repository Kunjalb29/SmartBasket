-- SmartBasket Seed Data
-- Version: 1.0.0

-- ============================================
-- CATEGORIES
-- ============================================
INSERT INTO categories (id, name, slug, description, icon, display_order) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Fresh Produce', 'fresh-produce', 'Fresh fruits, vegetables, and herbs', '🥑', 1),
  ('c1000000-0000-0000-0000-000000000002', 'Dairy & Eggs', 'dairy-eggs', 'Milk, cheese, yogurt, and eggs', '🥛', 2),
  ('c1000000-0000-0000-0000-000000000003', 'Meat & Seafood', 'meat-seafood', 'Fresh meats and sustainable seafood', '🐟', 3),
  ('c1000000-0000-0000-0000-000000000004', 'Bakery', 'bakery', 'Fresh bread, pastries, and baked goods', '🍞', 4),
  ('c1000000-0000-0000-0000-000000000005', 'Pantry', 'pantry', 'Dry goods, canned foods, and pantry staples', '🥫', 5),
  ('c1000000-0000-0000-0000-000000000006', 'Beverages', 'beverages', 'Water, juices, coffee, and tea', '☕', 6),
  ('c1000000-0000-0000-0000-000000000007', 'Snacks', 'snacks', 'Healthy and indulgent snack options', '🍿', 7),
  ('c1000000-0000-0000-0000-000000000008', 'Organic & Natural', 'organic-natural', 'Certified organic and natural products', '🌿', 8);

-- ============================================
-- ADMIN USER
-- ============================================
INSERT INTO users (id, email, password_hash, name, role, is_active, is_email_verified) VALUES
  ('u0000000-0000-0000-0000-000000000001', 'admin@smartbasket.ai', crypt('Admin@2024!', gen_salt('bf')), 'SmartBasket Admin', 'ADMIN', TRUE, TRUE),
  ('u0000000-0000-0000-0000-000000000002', 'demo@smartbasket.ai', crypt('Demo@2024!', gen_salt('bf')), 'Demo User', 'USER', TRUE, TRUE);

-- ============================================
-- USER PREFERENCES
-- ============================================
INSERT INTO user_preferences (user_id, theme, monthly_budget, daily_calorie_goal, dietary_restrictions, health_goals) VALUES
  ('u0000000-0000-0000-0000-000000000002', 'dark', 400.00, 2000, '{}', ARRAY['heart-health', 'weight-management']);

-- ============================================
-- SAMPLE PRODUCTS
-- ============================================
INSERT INTO products (id, name, brand, description, barcode, sku, category_id, price, original_price, discount_percentage, stock_count, unit, thumbnail, health_score, is_organic, is_vegan, is_on_sale, tags) VALUES
  ('p0000000-0000-0000-0000-000000000001', 'Organic Avocado', 'FreshFarm', 'Creamy, ripe Hass avocados sourced from organic farms', '012345678901', 'FF-AVO-001', 'c1000000-0000-0000-0000-000000000001', 5.99, 7.99, 25, 150, 'pack of 4', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300', 92, TRUE, TRUE, TRUE, ARRAY['organic', 'vegan', 'keto-friendly']),
  ('p0000000-0000-0000-0000-000000000002', 'Greek Yogurt', 'Chobani', 'Plain non-fat Greek yogurt with 17g protein per serving', '023456789012', 'CH-GYO-001', 'c1000000-0000-0000-0000-000000000002', 6.49, 6.49, 0, 200, '32 oz', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300', 88, FALSE, FALSE, FALSE, ARRAY['high-protein', 'probiotic']),
  ('p0000000-0000-0000-0000-000000000003', 'Wild Caught Salmon', 'SeaChoice', 'Premium Atlantic salmon fillets, wild-caught and sustainably sourced', '034567890123', 'SC-SAL-001', 'c1000000-0000-0000-0000-000000000003', 12.99, 15.99, 19, 80, '1 lb', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300', 96, FALSE, FALSE, TRUE, ARRAY['omega-3', 'high-protein', 'keto']),
  ('p0000000-0000-0000-0000-000000000004', 'Organic Spinach', 'EarthBound', 'Baby spinach leaves, triple washed and ready to eat', '045678901234', 'EB-SPN-001', 'c1000000-0000-0000-0000-000000000001', 4.99, 4.99, 0, 180, '5 oz', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300', 98, TRUE, TRUE, FALSE, ARRAY['organic', 'vegan', 'iron-rich']),
  ('p0000000-0000-0000-0000-000000000005', 'Whole Grain Oats', 'Bob''s Red Mill', 'Stone-ground whole grain rolled oats with beta-glucan fiber', '056789012345', 'BRM-OAT-001', 'c1000000-0000-0000-0000-000000000005', 8.99, 8.99, 0, 300, '32 oz', 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=300', 90, FALSE, TRUE, FALSE, ARRAY['fiber-rich', 'heart-healthy']);

-- ============================================
-- NUTRITION FACTS
-- ============================================
INSERT INTO nutrition_facts (product_id, serving_size, calories, total_fat, saturated_fat, cholesterol, sodium, total_carbs, dietary_fiber, total_sugars, protein) VALUES
  ('p0000000-0000-0000-0000-000000000001', '1/3 medium (50g)', 80, 7, 1, 0, 0, 4, 3, 0, 1),
  ('p0000000-0000-0000-0000-000000000002', '3/4 cup (170g)', 100, 0, 0, 10, 65, 7, 0, 5, 17),
  ('p0000000-0000-0000-0000-000000000003', '4 oz (113g)', 180, 8, 2, 65, 60, 0, 0, 0, 25),
  ('p0000000-0000-0000-0000-000000000004', '1.5 cups (85g)', 20, 0, 0, 0, 65, 3, 2, 0, 3),
  ('p0000000-0000-0000-0000-000000000005', '1/2 cup (40g)', 150, 3, 0, 0, 0, 27, 4, 1, 5);
