import { NextRequest, NextResponse } from 'next/server';

interface Room {
  id: string;
  [key: string]: any;
}

// Helper function to get rooms from localStorage
const getRooms = (): Room[] => {
  if (typeof window === 'undefined') return [];
  const rooms = localStorage.getItem('rooms');
  return rooms ? JSON.parse(rooms) : [];
};

// Helper function to save rooms to localStorage
const saveRooms = (rooms: Room[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('rooms', JSON.stringify(rooms));
};

export async function handleGetRoom(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const rooms = getRooms();
    const room = rooms.find((r) => r.id === params.id);

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch room' }, { status: 500 });
  }
}

export async function handleUpdateRoom(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const data = await request.json();
    const rooms = getRooms();
    const index = rooms.findIndex((r) => r.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const updatedRoom = {
      ...rooms[index],
      ...data,
    };

    rooms[index] = updatedRoom;
    saveRooms(rooms);

    return NextResponse.json(updatedRoom);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update room' }, { status: 500 });
  }
}

export async function handleDeleteRoom(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const rooms = getRooms();
    const filteredRooms = rooms.filter((r) => r.id !== params.id);

    if (filteredRooms.length === rooms.length) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    saveRooms(filteredRooms);
    return NextResponse.json({ message: 'Room deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete room' }, { status: 500 });
  }
}
