'use client';

import { Plus, X } from 'lucide-react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: { id: string; url: string }[];
  onImageAdd?: () => void;
  onImageRemove?: (id: string) => void;
}

export default function ImageGallery({
  images,
  onImageAdd,
  onImageRemove,
}: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="group relative aspect-square overflow-hidden rounded-lg"
        >
          <Image
            src={image.url}
            alt="Room"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {onImageRemove && (
            <button
              onClick={() => onImageRemove(image.id)}
              className="absolute right-2 top-2 rounded-full bg-white p-1 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      ))}
      {onImageAdd && (
        <button
          onClick={onImageAdd}
          className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 transition-colors hover:border-green-500 hover:text-green-500"
        >
          <Plus className="h-8 w-8" />
        </button>
      )}
    </div>
  );
}
