import type { StoreProduct } from '../types';

export const MOCK_PRODUCT_TAGS: Record<string, {
  rarity: "New" | "Popular" | "Limited";
  type: "Jerseys" | "Headwear" | "Performance" | "Collectibles";
  sizes?: string[];
}> = {
  prod_UPQCnB0ZtXV2Bz: { rarity: "New", type: "Collectibles" },
  prod_UPQBNx4ZKCifci: { rarity: "Popular", type: "Headwear" },
  prod_UPQAdmliBYYRfy: {
    rarity: "Limited",
    type: "Performance",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
  },
  prod_U7r90owRS9NMSE: {
    rarity: "Popular",
    type: "Jerseys",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
};

function priceAmountInMajorUnits(product: {
  default_price?: unknown;
}): number {
  const dp = product.default_price;
  if (dp && typeof dp === "object" && dp !== null && "unit_amount" in dp) {
    const cents = (dp as { unit_amount: number | null }).unit_amount;
    if (typeof cents === "number" && Number.isFinite(cents)) {
      return cents / 100;
    }
  }
  if (typeof dp === "string" && !dp.startsWith("price_")) {
    const raw = parseFloat(dp.replace(/[^0-9.]/g, ""));
    return Number.isFinite(raw) ? raw : 0;
  }
  return 0;
}

export function enrichProductsWithTags(products: any[]): StoreProduct[] {
  return products.map((product) => {
    const tags = MOCK_PRODUCT_TAGS[product.id] || {
      rarity: "New" as const,
      type: "Collectibles" as const,
    };
    return {
      ...product,
      ...tags,
      price_amount: priceAmountInMajorUnits(product),
    };
  });
}