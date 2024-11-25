import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Helper function to get rooms from localStorage
const getRooms = () => {
  if (typeof window === 'undefined') return [];
  const rooms = localStorage.getItem('rooms');
  return rooms ? JSON.parse(rooms) : [];
};

// Helper function to save rooms to localStorage
const saveRooms = (rooms: any[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('rooms', JSON.stringify(rooms));
};

export async function GET() {
  try {
    const rooms = getRooms();
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newRoom = {
      id: uuidv4(),
      ...data,
    };
    
    const rooms = getRooms();
    rooms.push(newRoom);
    saveRooms(rooms);
    
    return NextResponse.json(newRoom);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}
