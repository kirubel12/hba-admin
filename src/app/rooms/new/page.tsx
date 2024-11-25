'use client';

import RoomForm from '@/components/rooms/RoomForm';

export default function NewRoomPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Create New Room</h1>
      <RoomForm mode="create" />
    </div>
  );
}
