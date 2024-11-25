'use client';

import { Check } from 'lucide-react';

const amenities = [
  { id: 'wifi', name: 'Wi-Fi', category: 'Technology' },
  { id: 'tv', name: 'Smart TV', category: 'Technology' },
  { id: 'ac', name: 'Air Conditioning', category: 'Comfort' },
  { id: 'minibar', name: 'Mini Bar', category: 'Food & Beverage' },
  { id: 'safe', name: 'In-room Safe', category: 'Security' },
  { id: 'desk', name: 'Work Desk', category: 'Furniture' },
  { id: 'bathtub', name: 'Bathtub', category: 'Bathroom' },
  { id: 'shower', name: 'Rain Shower', category: 'Bathroom' },
  { id: 'toiletries', name: 'Premium Toiletries', category: 'Bathroom' },
  { id: 'coffee', name: 'Coffee Maker', category: 'Food & Beverage' },
  { id: 'iron', name: 'Iron & Board', category: 'Services' },
  { id: 'robe', name: 'Bathrobes', category: 'Comfort' },
];

export default function AmenitiesList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {amenities.map((amenity) => (
        <label
          key={amenity.id}
          className="group relative flex cursor-pointer items-start"
        >
          <div className="flex h-5 items-center">
            <input
              type="checkbox"
              className="peer h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              name={`amenity-${amenity.id}`}
              id={`amenity-${amenity.id}`}
            />
          </div>
          <div className="ml-3 text-sm">
            <span className="font-medium text-gray-900">{amenity.name}</span>
            <p className="text-gray-500">{amenity.category}</p>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-3 text-green-600 peer-checked:flex">
            <Check className="h-4 w-4" />
          </div>
        </label>
      ))}
    </div>
  );
}
