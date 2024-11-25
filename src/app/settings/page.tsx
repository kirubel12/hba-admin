'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import SettingsLoading from './loading';

function SettingsContent() {
  const [hotelName, setHotelName] = useState('');
  const [timezone, setTimezone] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [currency, setCurrency] = useState('');
  const [language, setLanguage] = useState('');
  const [address, setAddress] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Settings saved',
      description: 'Your changes have been successfully saved.',
    });
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Profile updated',
      description: 'Your profile has been successfully updated.',
    });
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">General Settings</h2>
            <form className="space-y-4" onSubmit={handleSaveChanges}>
              <div>
                <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700">Hotel Name</label>
                <Input 
                  id="hotelName" 
                  placeholder="Enter hotel name" 
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone</label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">EST</SelectItem>
                    <SelectItem value="pst">PST</SelectItem>
                    <SelectItem value="cet">CET</SelectItem>
                    <SelectItem value="jst">JST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                <Switch 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
                <Switch 
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Push Notifications</span>
                <Switch 
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="localization">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Localization Settings</h2>
            <form className="space-y-4" onSubmit={handleSaveChanges}>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                    <SelectItem value="jpy">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Hotel Profile</h2>
            <form className="space-y-4" onSubmit={handleSaveChanges}>
              <div>
                <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700">Hotel Name</label>
                <Input 
                  id="hotelName" 
                  placeholder="Enter hotel name" 
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <Input 
                  id="address" 
                  placeholder="Enter hotel address" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
                <Input 
                  id="contactEmail" 
                  type="email"
                  placeholder="Enter contact email" 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="hotelLogo" className="block text-sm font-medium text-gray-700">Hotel Logo</label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Hotel Logo" className="h-full w-full object-cover" />
                    ) : (
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12h7v7h-7v-7zm-1-1H4v7h7v-7zm1-7v7h7V4h-7zm-1 0H4v7h7V4z" />
                      </svg>
                    )}
                  </span>
                  <Button type="button" className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Upload Logo
                  </Button>
                </div>
              </div>
              <Button type="submit">Update Hotel Profile</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Account Settings</h2>
            <form className="space-y-4" onSubmit={handleProfileUpdate}>
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                <Input 
                  id="currentPassword" 
                  type="password"
                  placeholder="Enter current password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                <Input 
                  id="newPassword" 
                  type="password"
                  placeholder="Enter new password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <Input 
                  id="confirmPassword" 
                  type="password"
                  placeholder="Confirm new password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit">Update Account</Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<SettingsLoading />}>
        <SettingsContent />
      </Suspense>
    </DashboardLayout>
  );
}
