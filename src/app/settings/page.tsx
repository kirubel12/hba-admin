'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Simulated data
        setHotelName('Grand Hotel');
        setTimezone('est');
        setEmailNotifications(true);
        setSmsNotifications(false);
        setPushNotifications(true);
        setCurrency('usd');
        setLanguage('en');
        setAddress('123 Hotel Street');
        setContactEmail('contact@grandhotel.com');
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        toast({
          title: 'Error',
          description: 'Failed to load settings',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Settings saved',
        description: 'Your changes have been successfully saved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type = "text") => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      {isLoading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Input 
          id={id}
          type={type}
          placeholder={`Enter ${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
          disabled={isLoading}
        />
      )}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="p-6">
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
                {renderInput("hotelName", "Hotel Name", hotelName, (e) => setHotelName(e.target.value))}
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone</label>
                  {isLoading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <Select value={timezone} onValueChange={setTimezone} disabled={isLoading}>
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
                  )}
                </div>
                {isLoading ? (
                  <Skeleton className="h-10 w-24" />
                ) : (
                  <Button type="submit" disabled={isLoading}>Save Changes</Button>
                )}
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Notification Settings</h2>
              <div className="space-y-4">
                {['Email', 'SMS', 'Push'].map((type) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{type} Notifications</span>
                    {isLoading ? (
                      <Skeleton className="h-6 w-10" />
                    ) : (
                      <Switch 
                        checked={
                          type === 'Email' ? emailNotifications :
                          type === 'SMS' ? smsNotifications :
                          pushNotifications
                        }
                        onCheckedChange={(checked) => {
                          if (type === 'Email') setEmailNotifications(checked);
                          else if (type === 'SMS') setSmsNotifications(checked);
                          else setPushNotifications(checked);
                        }}
                        disabled={isLoading}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="localization">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Localization Settings</h2>
              <form className="space-y-4" onSubmit={handleSaveChanges}>
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
                  {isLoading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <Select value={currency} onValueChange={setCurrency} disabled={isLoading}>
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
                  )}
                </div>
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                  {isLoading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <Select value={language} onValueChange={setLanguage} disabled={isLoading}>
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
                  )}
                </div>
                {isLoading ? (
                  <Skeleton className="h-10 w-24" />
                ) : (
                  <Button type="submit" disabled={isLoading}>Save Changes</Button>
                )}
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Hotel Profile</h2>
              <form className="space-y-4" onSubmit={handleSaveChanges}>
                {renderInput("hotelName", "Hotel Name", hotelName, (e) => setHotelName(e.target.value))}
                {renderInput("address", "Address", address, (e) => setAddress(e.target.value))}
                {renderInput("contactEmail", "Contact Email", contactEmail, (e) => setContactEmail(e.target.value), "email")}
                <div>
                  <label htmlFor="hotelLogo" className="block text-sm font-medium text-gray-700">Hotel Logo</label>
                  <div className="mt-1 flex items-center">
                    {isLoading ? (
                      <Skeleton className="h-12 w-12 rounded-full" />
                    ) : (
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        {logoUrl ? (
                          <img src={logoUrl} alt="Hotel Logo" className="h-full w-full object-cover" />
                        ) : (
                          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12h7v7h-7v-7zm-1-1H4v7h7v-7zm1-7v7h7V4h-7zm-1 0H4v7h7V4z" />
                          </svg>
                        )}
                      </span>
                    )}
                    {isLoading ? (
                      <Skeleton className="ml-5 h-10 w-24" />
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        className="ml-5"
                        disabled={isLoading}
                      >
                        Upload Logo
                      </Button>
                    )}
                  </div>
                </div>
                {isLoading ? (
                  <Skeleton className="h-10 w-32" />
                ) : (
                  <Button type="submit" disabled={isLoading}>Update Hotel Profile</Button>
                )}
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Account Settings</h2>
              <form className="space-y-4" onSubmit={handleProfileUpdate}>
                {renderInput("currentPassword", "Current Password", currentPassword, (e) => setCurrentPassword(e.target.value), "password")}
                {renderInput("newPassword", "New Password", newPassword, (e) => setNewPassword(e.target.value), "password")}
                {renderInput("confirmPassword", "Confirm New Password", confirmPassword, (e) => setConfirmPassword(e.target.value), "password")}
                {isLoading ? (
                  <Skeleton className="h-10 w-32" />
                ) : (
                  <Button type="submit" disabled={isLoading}>Update Account</Button>
                )}
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
