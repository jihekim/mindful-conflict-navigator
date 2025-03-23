
import React, { useState } from 'react';
import StakeholderLayout from '@/components/StakeholderLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Lock, Eye, UserCheck, Users, School, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const StakeholderShare = () => {
  const { currentUser } = useAuth();
  
  // These would be fetched from an API in a real app
  const [sharingSettings, setSharingSettings] = useState({
    counselor: true, // This is required
    teachers: false,
    students: false,
    parents: false,
    police: false
  });
  
  const handleToggle = (setting: keyof typeof sharingSettings) => {
    if (setting === 'counselor') {
      toast({
        title: "Cannot modify this setting",
        description: "Sharing with your counselor is required for mediation.",
        variant: "destructive"
      });
      return;
    }
    
    setSharingSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Sharing settings updated",
      description: `Your report is now ${!sharingSettings[setting] ? 'shared with' : 'private from'} ${setting}.`,
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Sharing preferences saved",
      description: "Your sharing settings have been updated successfully.",
    });
  };

  return (
    <StakeholderLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sharing Settings</h2>
          <p className="text-muted-foreground">
            Control who can see your insight report
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Privacy Controls</CardTitle>
            <CardDescription>
              Choose who can access your information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Counselor</p>
                  <p className="text-sm text-muted-foreground">Required for mediation process</p>
                </div>
              </div>
              <Switch checked={sharingSettings.counselor} onCheckedChange={() => handleToggle('counselor')} disabled />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <School className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Teachers</p>
                  <p className="text-sm text-muted-foreground">Allow teachers to view your report</p>
                </div>
              </div>
              <Switch checked={sharingSettings.teachers} onCheckedChange={() => handleToggle('teachers')} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Other Students</p>
                  <p className="text-sm text-muted-foreground">Share with other involved students</p>
                </div>
              </div>
              <Switch checked={sharingSettings.students} onCheckedChange={() => handleToggle('students')} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Parents</p>
                  <p className="text-sm text-muted-foreground">Share with parents or guardians</p>
                </div>
              </div>
              <Switch checked={sharingSettings.parents} onCheckedChange={() => handleToggle('parents')} />
            </div>
            
            {currentUser?.role !== 'police' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Police</p>
                    <p className="text-sm text-muted-foreground">For cases requiring legal involvement</p>
                  </div>
                </div>
                <Switch checked={sharingSettings.police} onCheckedChange={() => handleToggle('police')} />
              </div>
            )}
            
            <div className="pt-4 flex items-center justify-between border-t">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Your data is encrypted and secure</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Eye className="h-4 w-4" />
                <span>{Object.values(sharingSettings).filter(Boolean).length} viewers</span>
              </div>
            </div>
            
            <Button onClick={handleSaveSettings} className="w-full">Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </StakeholderLayout>
  );
};

export default StakeholderShare;
