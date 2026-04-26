import { Button } from '@heroui/react';

interface FilterBarProps {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  priceRange: [number, number];
  onPriceChange: (range: number | number[]) => void;
  maxPrice: number;
}

const PRODUCT_TYPES = [
  { id: null, label: 'All' },
  { id: 'Jerseys', label: 'Jerseys' },
  { id: 'Headwear', label: 'Headwear' },
  { id: 'Performance', label: 'Performance' },
  { id: 'Collectibles', label: 'Collectibles' },
];

export default function FilterBar({
  selectedType,
  onTypeChange,
  priceRange,
  onPriceChange,
  maxPrice
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#0B2A4A] mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_TYPES.map(type => (
            <Button
              key={type.label}
              variant={selectedType === type.id ? 'solid' : 'bordered'}
              color={selectedType === type.id ? 'primary' : 'default'}
              size="sm"
              onClick={() => onTypeChange(type.id)}
              className={`
                transition-all duration-200
                ${selectedType === type.id 
                  ? 'bg-blue-600 text-white shadow-md scale-105' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-sm'
                }
              `}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#0B2A4A] mb-3">Price Range</h3>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span className="font-medium">${priceRange[0]}</span>
          <span className="font-medium">${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}