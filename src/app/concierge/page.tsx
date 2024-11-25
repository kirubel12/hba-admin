'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const requests = [
  {
    id: '1',
    guestName: 'John Doe',
    guestAvatar: 'https://picsum.photos/200?guest=1',
    roomNumber: '101',
    type: 'Room Service',
    description: 'Extra towels needed',
    status: 'pending',
    priority: 'high',
    createdAt: '10 minutes ago',
  },
  {
    id: '2',
    guestName: 'Jane Smith',
    guestAvatar: 'https://picsum.photos/200?guest=2',
    roomNumber: '102',
    type: 'Maintenance',
    description: 'AC not working properly',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '1 hour ago',
  },
  // Add more requests as needed
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-blue-100 text-blue-800',
};

export default function ConciergePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Concierge</h1>
        <button className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
          New Request
        </button>
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
              placeholder="Search requests..."
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <div
            key={request.id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-8">
                    <Image
                      src={request.guestAvatar}
                      alt={request.guestName}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {request.guestName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Room {request.roomNumber}
                    </p>
                  </div>
                </div>
                <button className="rounded p-1 text-gray-400 hover:bg-gray-100">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {request.type}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      priorityColors[request.priority as keyof typeof priorityColors]
                    }`}
                  >
                    {request.priority.charAt(0).toUpperCase() +
                      request.priority.slice(1)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{request.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    statusColors[request.status as keyof typeof statusColors]
                  }`}
                >
                  {request.status === 'in-progress' ? 'In Progress' : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
                <span className="flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  {request.createdAt}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
