'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Send } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const conversations = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://picsum.photos/200?guest=1',
    lastMessage: 'I have a question about room service.',
    time: '5m ago',
    unread: true,
    online: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://picsum.photos/200?guest=2',
    lastMessage: 'Thank you for your assistance!',
    time: '1h ago',
    unread: false,
    online: false,
  },
  // Add more conversations as needed
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-lg border border-gray-200 bg-white">
        {/* Conversation List */}
        <div className="w-80 flex-shrink-0 border-r border-gray-200">
          <div className="p-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ul className="divide-y divide-gray-200">
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`cursor-pointer p-4 hover:bg-gray-50 ${
                  selectedConversation.id === conversation.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 flex-shrink-0">
                    <Image
                      src={conversation.avatar}
                      alt={conversation.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    {conversation.online && (
                      <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {conversation.name}
                      </p>
                      <p className="text-xs text-gray-500">{conversation.time}</p>
                    </div>
                    <p className="truncate text-sm text-gray-500">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && (
                    <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-green-500" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col">
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image
                  src={selectedConversation.avatar}
                  alt={selectedConversation.name}
                  fill
                  className="rounded-full object-cover"
                />
                {selectedConversation.online && (
                  <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
                )}
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-900">
                  {selectedConversation.name}
                </h2>
                <p className="text-xs text-gray-500">
                  {selectedConversation.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* Chat messages would go here */}
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-4">
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Type your message..."
              />
              <button className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
