
import React, { useState } from 'react';
import StakeholderLayout from '@/components/StakeholderLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Lock, 
  Eye, 
  UserCheck, 
  Users, 
  School, 
  Shield, 
  Info, 
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
      toast.error("Sharing with your counselor is required for mediation.");
      return;
    }
    
    if (sharingSettings[setting]) {
      // If we're turning off sharing, show confirmation toast
      toast.promise(
        new Promise((resolve) => {
          // Simulate API call
          setTimeout(resolve, 1000);
        }),
        {
          loading: `Revoking access from ${setting}...`,
          success: () => {
            setSharingSettings(prev => ({
              ...prev,
              [setting]: false
            }));
            return `Access successfully revoked from ${setting}`;
          },
          error: "Failed to revoke access"
        }
      );
    } else {
      setSharingSettings(prev => ({
        ...prev,
        [setting]: true
      }));
      
      toast.success(`Your report is now shared with ${setting}.`);
    }
  };
  
  const handleSaveSettings = () => {
    toast.success("Sharing preferences saved successfully.");
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
        
        <Alert className="bg-blue-50 text-blue-700 border-blue-100">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Your chat conversations remain completely private. Only your insight report can be shared with others to support the mediation process.
          </AlertDescription>
        </Alert>
        
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
                <div className="bg-[#5fb455]/10 p-2 rounded-full">
                  <UserCheck className="h-5 w-5 text-[#5fb455]" />
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
                <div className="bg-[#5fb455]/10 p-2 rounded-full">
                  <School className="h-5 w-5 text-[#5fb455]" />
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
                <div className="bg-[#5fb455]/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-[#5fb455]" />
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
                <div className="bg-[#5fb455]/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-[#5fb455]" />
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
                  <div className="bg-[#5fb455]/10 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-[#5fb455]" />
                  </div>
                  <div>
                    <p className="font-medium">Police</p>
                    <p className="text-sm text-muted-foreground">For cases requiring legal involvement</p>
                  </div>
                </div>
                <Switch checked={sharingSettings.police} onCheckedChange={() => handleToggle('police')} />
              </div>
            )}
            
            <div className="rounded-md bg-amber-50 p-4 text-amber-700 text-sm">
              <div className="flex">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Important Privacy Notice</h4>
                  <p className="mt-1">
                    You can revoke access at any time by toggling off these settings. Once revoked, 
                    the person will no longer have access to your report.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-md bg-[#5fb455]/10 p-4 text-[#4ea344] text-sm">
              <div className="flex">
                <MessageSquare className="h-5 w-5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Chat Privacy</h4>
                  <p className="mt-1">
                    Your conversations in the AI Chat are completely private and are never shared with anyone. 
                    Only the insight report with your emotional analysis and summary can be shared.
                  </p>
                </div>
              </div>
            </div>
            
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
            
            <Button onClick={handleSaveSettings} className="w-full bg-[#5fb455] hover:bg-[#4ea344]">Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </StakeholderLayout>
  );
};

export default StakeholderShare;
