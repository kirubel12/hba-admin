'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface RoomLayoutProps {
  children: React.ReactNode;
  title: string;
  roomNumber?: string;
}

export default function RoomLayout({ children, title, roomNumber }: RoomLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="ml-60">
        <div className="p-8">
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 text-sm md:space-x-3">
                <li>
                  <Link href="/rooms" className="text-gray-500 hover:text-gray-700">
                    Rooms
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    <span className="ml-1 text-gray-500">{title}</span>
                    {roomNumber && (
                      <>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <span className="ml-1 text-gray-500">
                          Room {roomNumber}
                        </span>
                      </>
                    )}
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">
              {title} {roomNumber && `- Room ${roomNumber}`}
            </h1>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
