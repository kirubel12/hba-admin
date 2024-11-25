'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Add logout logic here
    const timeout = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <LogOut className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Signing you out...
        </h1>
        <p className="text-gray-500">Please wait while we log you out safely.</p>
      </div>
    </div>
  );
}
