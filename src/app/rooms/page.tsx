/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Filter, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { roomService, type Room } from '@/lib/services/roomService';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const roomStatuses = {
  available: 'bg-green-100 text-green-800',
  occupied: 'bg-red-100 text-red-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  reserved: 'bg-blue-100 text-blue-800',
};

interface ImageIndex {
  [key: string]: number;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<ImageIndex>({});

  useEffect(() => {
    roomService.initialize();
    const loadedRooms = roomService.getAllRooms();
    setRooms(loadedRooms);
    setIsLoading(false);
    const initialImageIndices = loadedRooms.reduce((acc, room) => {
      acc[room.id] = 0;
      return acc;
    }, {} as ImageIndex);
    setCurrentImageIndex(initialImageIndices);
  }, []);

  const handleDeleteRoom = (room: Room) => {
    const success = roomService.deleteRoom(room.id);
    if (success) {
      toast({
        title: 'Success',
        description: 'Room deleted successfully',
      });
      setRooms((rooms) => rooms?.filter((r) => r.id !== room.id) || []);
    } else {
      toast({
        title: 'Failed to delete room',
        description: 'Failed to delete room',
        variant: 'destructive',
      });
    }
    setDeleteDialogOpen(false);
  };

  const filteredRooms = rooms?.filter((room) =>
    room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.type.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handlePrevImage = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room?.images?.length) return;
    setCurrentImageIndex((prev) => ({
      ...prev,
      [roomId]: (prev[roomId] - 1 + room.images.length) % room.images.length,
    }));
  };

  const handleNextImage = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room?.images?.length) return;
    setCurrentImageIndex((prev) => ({
      ...prev,
      [roomId]: (prev[roomId] + 1) % room.images.length,
    }));
  };

  return (
    <>
      <Header />
      <Sidebar />
      <main className="pl-60 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Rooms</h1>
            <Link
              href="/rooms/new"
              className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Link>
          </div>

          <div className="mb-6 flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRooms.map((room) => (
                <Card key={room.id} className="overflow-hidden">
                  <div className="relative h-48">
                    {room.images?.length > 0 && (
                      <>
                        <Image
                          src={room.images[currentImageIndex[room.id] || 0]}
                          alt={`Room ${room.number}`}
                          fill
                          className="object-cover"
                        />
                        {room.images.length > 1 && (
                          <>
                            <Button
                              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white"
                              onClick={() => handlePrevImage(room.id)}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white"
                              onClick={() => handleNextImage(room.id)}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Room {room.number}</h2>
                      <span className={`rounded-full px-2 py-1 text-xs ${roomStatuses[room.status as keyof typeof roomStatuses]}`}>
                        {room.status}
                      </span>
                    </div>
                    <p className="text-gray-600">{room.type}</p>
                    <p className="text-lg font-bold">${room.price}/night</p>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Link href={`/rooms/${room.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setRoomToDelete(room);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete Room {roomToDelete?.number}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => roomToDelete && handleDeleteRoom(roomToDelete)}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
