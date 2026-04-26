import { useEffect, useState, useMemo } from 'react';
import { getProducts } from '../services/storeService';
import type { StoreProduct } from '../types';
import Navbar from '../components/layout/Navbar';
import ProductCard from '../components/store/ProductCard';
import FilterBar from '../components/store/FilterBar';
import RarityDropdown from '../components/store/RarityDropdown';
import ProductCounter from '../components/store/ProductCounter';
import CartButton from '../components/store/CartButton';
import { useCart } from '../context/CartContext';
import { enrichProductsWithTags } from '../data/mockProducts';

export default function StorePage() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((res) => {
        const enrichedProducts = enrichProductsWithTags(res.products);
        setProducts(enrichedProducts);
         
        const maxPrice = Math.max(...enrichedProducts.map(p => p.price_amount), 200);
        setPriceRange([0, maxPrice]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedType) {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    if (selectedRarity) {
      filtered = filtered.filter(p => p.rarity === selectedRarity);
    }

    filtered = filtered.filter(p => {
      return p.price_amount >= priceRange[0] && p.price_amount <= priceRange[1];
    });

    return filtered;
  }, [products, selectedType, selectedRarity, priceRange]);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map(p => p.price_amount), 200);
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F5F7]">
        {/* Wrapper para el Navbar con max-width */}
        <div className="mx-auto w-full max-w-[1400px] px-6">
          <Navbar />
        </div>
        <main className="mx-auto w-full max-w-[1400px] px-6">
          <p className="text-gray-600">Loading products…</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      {/* Wrapper para el Navbar con max-width */}
      <div className="mx-auto w-full max-w-[1400px] px-6">
        <Navbar />
      </div>
      
      <main className="mx-auto w-full max-w-[1400px] px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0f3d78] mb-2">Store</h1>
          <p className="text-gray-600">Encuentra los mejores productos de Titans</p>
        </div>

        {/* Filtros y Contador */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Sidebar de filtros */}
          <aside className="lg:col-span-1 space-y-4">
            <RarityDropdown
              selectedRarity={selectedRarity}
              onRarityChange={setSelectedRarity}
            />
            <FilterBar
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              priceRange={priceRange}
              onPriceChange={(value) => setPriceRange(value as [number, number])}
              maxPrice={maxPrice}
            />
          </aside>

          {/* Grid de productos */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <ProductCounter 
                count={filteredProducts.length} 
                totalCount={products.length}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(product) => addToCart(product, 1)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No se encontraron productos con estos filtros</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Botón flotante del carrito */}
      <CartButton />
    </div>
  );
}