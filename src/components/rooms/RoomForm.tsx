'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { roomService, type Room } from '@/lib/services/roomService';
import Image from 'next/image';
import { X } from 'lucide-react';

interface RoomFormProps {
  initialData?: Room;
  mode: 'create' | 'edit';
}

export default function RoomForm({ initialData, mode }: RoomFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Omit<Room, 'id'>>(
    initialData || {
      number: '',
      type: 'Deluxe',
      status: 'available',
      price: 0,
      images: [],
    }
  );

  useEffect(() => {
    if (initialData?.images) {
      setFormData(prev => ({ ...prev, images: initialData.images }));
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'create') {
        await roomService.createRoom(formData);
        toast({
          title: 'Room created successfully',
          variant: 'success',
        });
      } else if (initialData?.id) {
        await roomService.updateRoom(initialData.id, formData);
        toast({
          title: 'Room updated successfully',
          variant: 'success',
        });
      }
      router.push('/rooms');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          newImages.push(result);
          setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
          <Input
            id="roomNumber"
            type="text"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">Type</label>
          <Select id="roomType" value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Deluxe">Deluxe</SelectItem>
              <SelectItem value="Suite">Suite</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="roomStatus" className="block text-sm font-medium text-gray-700">Status</label>
          <Select id="roomStatus" value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select room status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="roomPrice" className="block text-sm font-medium text-gray-700">Price</label>
          <Input
            id="roomPrice"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
        </div>

        <div>
          <label htmlFor="roomImage" className="block text-sm font-medium text-gray-700">Image</label>
          <div className="mt-1">
            <Input
              id="roomImages"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Add Images
            </Button>
            <p className="mt-2 text-sm text-gray-500">
              You can select one or more images
            </p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={image}
                  alt={`Room preview ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : mode === 'create' ? 'Create Room' : 'Update Room'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
