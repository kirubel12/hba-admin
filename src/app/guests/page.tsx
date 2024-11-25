'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Filter, Mail, Phone } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const guests = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    status: 'checked-in',
    room: '101',
    checkIn: '2024-01-15',
    checkOut: '2024-01-20',
    avatar: 'https://picsum.photos/200?guest=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234 567 891',
    status: 'reserved',
    room: '102',
    checkIn: '2024-01-25',
    checkOut: '2024-01-30',
    avatar: 'https://picsum.photos/200?guest=2',
  },
  // Add more guests as needed
];

export default function GuestsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Guests</h1>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Search guests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <ul className="divide-y divide-gray-200">
          {guests.map((guest) => (
            <li
              key={guest.id}
              className="group flex items-center gap-4 p-4 hover:bg-gray-50"
            >
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  src={guest.avatar}
                  alt={guest.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {guest.name}
                  </p>
                  <div className="ml-2 flex flex-shrink-0">
                    <p
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        guest.status === 'checked-in'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {guest.status === 'checked-in' ? 'Checked In' : 'Reserved'}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {guest.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {guest.phone}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Room {guest.room} • {guest.checkIn} to {guest.checkOut}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
}
