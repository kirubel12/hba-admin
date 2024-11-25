"use client";
import { useEffect, useState } from 'react';
import RoomForm from '@/components/rooms/RoomForm';
import { toast } from '@/hooks/use-toast';
import RoomLayout from '@/components/layout/RoomLayout';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { roomService, type Room } from '@/lib/services/roomService';

export default function RoomEditPage({
  params,
}: {
  params: { id: string } | undefined;
}) {
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params) {
      toast({
        title: 'Error',
        description: 'Room not found',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }
    roomService.initialize();
    const loadedRoom = roomService.getRoomById(params.id);
    if (loadedRoom) {
      setRoom(loadedRoom);
      setIsLoading(false);
    } else {
      toast({
        title: 'Error',
        description: 'Room not found',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  }, [params]);

  if (isLoading) {
    return (
      <>
        <Header />
        <Sidebar />
        <RoomLayout title="Edit Room" roomNumber="002">
          <div className="container mx-auto px-4 py-8">Loading...</div>
        </RoomLayout>
      </>
    );
  }

  if (!room) {
    return (
      <>
        <Header />
        <Sidebar />
        <RoomLayout title="Edit Room" roomNumber="002">
          <div className="container mx-auto px-4 py-8">Room not found</div>
        </RoomLayout>
      </>
    );
  }

  return (
    <>
      <Header />
      <Sidebar />
      <RoomLayout title="Edit Room" roomNumber={room.number}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit Room {room.number}</h1>
          <RoomForm mode="edit" initialData={room} />
        </div>
      </RoomLayout>
    </>
  );
}
