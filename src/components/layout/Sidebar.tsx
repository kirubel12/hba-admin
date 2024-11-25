'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Hotel,
  Users,
  Calendar,
  MessageSquare,
  Headphones,
  Settings,
  LogOut,
} from 'lucide-react';

const navItems = [
  { label: 'Home', icon: Home, href: '/dashboard' },
  { label: 'Rooms', icon: Hotel, href: '/rooms' },
  { label: 'Guests', icon: Users, href: '/guests' },
  { label: 'Bookings', icon: Calendar, href: '/bookings' },
  { label: 'Messages', icon: MessageSquare, href: '/messages' },
  { label: 'Concierge', icon: Headphones, href: '/concierge' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 border-r border-gray-200 bg-white">
      <div className="flex h-full flex-col justify-between px-3 py-4">
        <div>
          <div className="mb-8 px-2.5">
            <h1 className="text-xl font-bold text-gray-800">HBA Admin</h1>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-green-600' : 'text-gray-400'
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <button className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <LogOut className="mr-3 h-5 w-5 text-gray-400" />
          Logout
        </button>
      </div>
    </aside>
  );
}
