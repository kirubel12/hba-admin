'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Users, Hotel, Calendar, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardLoading from './loading';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  description?: string;
}

const StatCard = ({ title, value, icon, trend, description }: StatCardProps) => (
  <Card className="p-3 space-y-1">
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="p-1 bg-gray-50 rounded-md">{icon}</div>
    </div>
    <div className="text-xl font-bold">{value}</div>
    {trend && (
      <div className="flex items-center text-sm">
        <div className={`flex items-center ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          <span className="font-medium">{trend.value}%</span>
        </div>
        {description && <span className="ml-1 text-muted-foreground">{description}</span>}
      </div>
    )}
  </Card>
);

function DashboardContent() {
  const [stats, setStats] = useState({
    totalGuests: '1,234',
    occupancyRate: '85%',
    monthlyBookings: '456',
    revenue: '$45,678',
  });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({
          totalGuests: '1,500',
          occupancyRate: '90%',
          monthlyBookings: '500',
          revenue: '$50,000',
        }), 1000)
      );
      setStats(response as typeof stats);
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Guests"
          value={stats.totalGuests}
          icon={<Users className="h-5 w-5 text-blue-500" />}
          trend={{ value: 12, isPositive: true }}
          description="vs last month"
        />
        <StatCard
          title="Occupancy Rate"
          value={stats.occupancyRate}
          icon={<Hotel className="h-5 w-5 text-green-500" />}
          trend={{ value: 8, isPositive: true }}
          description="vs last month"
        />
        <StatCard
          title="Monthly Bookings"
          value={stats.monthlyBookings}
          icon={<Calendar className="h-5 w-5 text-purple-500" />}
          trend={{ value: 5, isPositive: false }}
          description="vs last month"
        />
        <StatCard
          title="Revenue"
          value={stats.revenue}
          icon={<DollarSign className="h-5 w-5 text-yellow-500" />}
          trend={{ value: 15, isPositive: true }}
          description="vs last month"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Revenue Overview</h2>
          <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
            Chart will be implemented here
          </div>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Recent Bookings</h2>
          <div className="text-sm text-muted-foreground">
            Recent bookings will be displayed here
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<DashboardLoading />}>
        <DashboardContent />
      </Suspense>
    </DashboardLayout>
  );
}
