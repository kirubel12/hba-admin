'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Filter, Calendar, Clock } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const bookings = [
  {
    id: '1',
    guestName: 'John Doe',
    guestAvatar: 'https://picsum.photos/200?guest=1',
    roomNumber: '101',
    roomType: 'Deluxe',
    checkIn: '2024-01-15',
    checkOut: '2024-01-20',
    status: 'confirmed',
    payment: 'paid',
    amount: 995,
  },
  {
    id: '2',
    guestName: 'Jane Smith',
    guestAvatar: 'https://picsum.photos/200?guest=2',
    roomNumber: '102',
    roomType: 'Suite',
    checkIn: '2024-01-25',
    checkOut: '2024-01-30',
    status: 'pending',
    payment: 'unpaid',
    amount: 1495,
  },
  // Add more bookings as needed
];

const statusColors = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
};

const paymentColors = {
  paid: 'bg-green-100 text-green-800',
  unpaid: 'bg-red-100 text-red-800',
  partial: 'bg-yellow-100 text-yellow-800',
};

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
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
              placeholder="Search bookings..."
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
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="group flex items-center gap-4 p-4 hover:bg-gray-50"
            >
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  src={booking.guestAvatar}
                  alt={booking.guestName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {booking.guestName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Room {booking.roomNumber} • {booking.roomType}
                    </p>
                  </div>
                  <div className="ml-2 flex items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        statusColors[booking.status as keyof typeof statusColors]
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        paymentColors[booking.payment as keyof typeof paymentColors]
                      }`}
                    >
                      {booking.payment.charAt(0).toUpperCase() +
                        booking.payment.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {booking.checkIn} to {booking.checkOut}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />5 nights
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${booking.amount}
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
