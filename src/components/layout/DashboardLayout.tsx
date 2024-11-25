'use client';

import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="min-h-screen bg-gray-50 pt-16 pl-60">
        <div className="p-8">{children}</div>
      </main>
    </>
  );
}
