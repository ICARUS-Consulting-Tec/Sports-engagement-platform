import type { StoreProduct } from '../types';

export const MOCK_PRODUCT_TAGS: Record<string, {
  rarity: 'New' | 'Popular' | 'Limited';
  type: 'Jerseys' | 'Headwear' | 'Performance' | 'Collectibles';
  sizes?: string[];
}> = {
  'prod_123': { 
    rarity: 'New', 
    type: 'Jerseys',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  'prod_456': { 
    rarity: 'Popular', 
    type: 'Headwear'
  },
  'prod_789': { 
    rarity: 'Limited', 
    type: 'Performance',
    sizes: ['S', 'M', 'L', 'XL']
  },
};

// Función helper para enriquecer productos con tags MOCK
export function enrichProductsWithTags(products: any[]): StoreProduct[] {
  return products.map(product => {
    const tags = MOCK_PRODUCT_TAGS[product.id] || {
      rarity: 'New',
      type: 'Collectibles'
    };
    
    // Convertir default_price a número
    const priceAmount = typeof product.default_price === 'string' 
      ? parseFloat(product.default_price.replace('$', ''))
      : product.default_price;
    
    return {
      ...product,
      ...tags,
      price_amount: priceAmount
    };
  });
}