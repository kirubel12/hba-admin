import { v4 as uuidv4 } from 'uuid';

export interface Room {
  id: string;
  number: string;
  type: string;
  status: string;
  price: number;
  image: string;
}

const STORAGE_KEY = 'rooms';

// Initialize with some sample data if empty
const initializeRooms = () => {
  const existingRooms = localStorage.getItem(STORAGE_KEY);
  if (!existingRooms) {
    const sampleRooms = [
      {
        id: uuidv4(),
        number: '101',
        type: 'Deluxe',
        status: 'available',
        price: 199,
        image: 'https://picsum.photos/800/600?room=101',
      },
      {
        id: uuidv4(),
        number: '102',
        type: 'Suite',
        status: 'occupied',
        price: 299,
        image: 'https://picsum.photos/800/600?room=102',
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleRooms));
  }
};

export const roomService = {
  initialize: () => {
    if (typeof window !== 'undefined') {
      initializeRooms();
    }
  },

  getAllRooms: (): Room[] => {
    const rooms = localStorage.getItem(STORAGE_KEY);
    return rooms ? JSON.parse(rooms) : [];
  },

  getRoomById: (id: string): Room | null => {
    const rooms = roomService.getAllRooms();
    return rooms.find(room => room.id === id) || null;
  },

  createRoom: (roomData: Omit<Room, 'id'>): Room => {
    const newRoom = {
      id: uuidv4(),
      ...roomData,
    };
    const rooms = roomService.getAllRooms();
    rooms.push(newRoom);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
    return newRoom;
  },

  updateRoom: (id: string, roomData: Partial<Room>): Room | null => {
    const rooms = roomService.getAllRooms();
    const index = rooms.findIndex(room => room.id === id);
    
    if (index === -1) return null;
    
    const updatedRoom = {
      ...rooms[index],
      ...roomData,
    };
    
    rooms[index] = updatedRoom;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
    return updatedRoom;
  },

  deleteRoom: (id: string): boolean => {
    const rooms = roomService.getAllRooms();
    const filteredRooms = rooms.filter(room => room.id !== id);
    
    if (filteredRooms.length === rooms.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRooms));
    return true;
  },
};
