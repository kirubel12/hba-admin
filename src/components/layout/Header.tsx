'use client';

import { Bell, Search, Menu } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed left-60 right-0 top-0 z-30 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex flex-1 items-center">
          <button className="p-2 text-gray-400 lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-4 flex max-w-md flex-1">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 text-gray-400 hover:bg-gray-100">
            <Bell className="h-6 w-6" />
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Image
                src="https://picsum.photos/200"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@hba.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
