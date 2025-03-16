import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { HeroSection } from './components/HeroSection';
import { DealsSection } from './components/DealsSection';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Filters } from './components/Filters';
import { Recommendations } from './components/Recommendations';
import { CartProvider } from './context/CartContext';
import { Product, FilterOptions, SortOption } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    inStock: true,
  });

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
        
        // Set initial price range based on actual product prices
        const prices = data.map(p => p.price);
        setFilterOptions(prev => ({
          ...prev,
          priceRange: {
            min: Math.floor(Math.min(...prices)),
            max: Math.ceil(Math.max(...prices))
          }
        }));
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(product =>
      product.price >= filterOptions.priceRange.min &&
      product.price <= filterOptions.priceRange.max
    );

    // Apply rating filter
    if (filterOptions.rating > 0) {
      filtered = filtered.filter(product =>
        product.rating.rate >= filterOptions.rating
      );
    }

    // Apply stock filter
    if (!filterOptions.inStock) {
      filtered = filtered.filter(product =>
        product.rating.count > 0
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products, filterOptions, sortOption]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(""); // Reset category when searching
  };

  const prices = products.map(p => p.price);
  const minPrice = Math.floor(Math.min(...(prices.length ? prices : [0])));
  const maxPrice = Math.ceil(Math.max(...(prices.length ? prices : [1000])));

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Header onSearch={handleSearch} />
        <Categories 
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        
        {!showCart && !selectedCategory && !searchQuery && <HeroSection />}
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory 
                  ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
                  : "Featured Products"}
            </h2>
            <div className="flex items-center gap-4">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <button
                onClick={() => setShowCart(!showCart)}
                className="bg-[#232f3e] text-white px-6 py-2 rounded-md hover:bg-[#1a242f]"
              >
                {showCart ? 'View Products' : 'View Cart'}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : showCart ? (
            <Cart />
          ) : (
            <div className="flex gap-6">
              <div className="w-64 flex-shrink-0">
                <Filters
                  options={filterOptions}
                  onFilterChange={setFilterOptions}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
              </div>
              <div className="flex-1">
                {!selectedCategory && !searchQuery && <DealsSection />}
                
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">
                      {searchQuery
                        ? `No products found matching "${searchQuery}"`
                        : "No products found in this category."}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    <Recommendations products={products} />
                  </>
                )}
              </div>
            </div>
          )}
        </main>

        <footer className="bg-[#232f3e] text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold mb-4">Get to Know Us</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">About Us</a></li>
                  <li><a href="#" className="hover:underline">Careers</a></li>
                  <li><a href="#" className="hover:underline">Press Releases</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Connect with Us</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">Facebook</a></li>
                  <li><a href="#" className="hover:underline">Twitter</a></li>
                  <li><a href="#" className="hover:underline">Instagram</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Make Money with Us</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">Sell on Amazon</a></li>
                  <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
                  <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Let Us Help You</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">Your Account</a></li>
                  <li><a href="#" className="hover:underline">Returns Centre</a></li>
                  <li><a href="#" className="hover:underline">100% Purchase Protection</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;