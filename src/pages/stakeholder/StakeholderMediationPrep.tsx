
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Edit2, 
  CheckCircle, 
  XCircle, 
  Upload, 
  Paperclip, 
  Trash2, 
  Calendar, 
  Clock, 
  Users,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import StakeholderLayout from '@/components/StakeholderLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Meeting {
  id: string;
  date: string;
  time: string;
  participants: string[];
  location: string;
}

const StakeholderMediationPrep = () => {
  const [editingNotes, setEditingNotes] = useState(false);
  const [mediationNotes, setMediationNotes] = useState(
    "Things I want to remember to say during mediation:\n" +
    "- I felt uncomfortable when...\n" +
    "- I want to find a solution where...\n" +
    "- I hope that we can agree on..."
  );
  
  const [files, setFiles] = useState([
    { id: '1', name: 'My class schedule.pdf', type: 'application/pdf', size: '125 KB' }
  ]);
  
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([
    {
      id: '1',
      date: '2023-06-15',
      time: '3:30 PM - 4:30 PM',
      participants: ['Counselor Chris', 'Student B'],
      location: 'Room 204'
    }
  ]);
  
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [meetingDetailsOpen, setMeetingDetailsOpen] = useState(false);
  
  const handleSaveNotes = () => {
    setEditingNotes(false);
    toast.success("Mediation notes updated successfully");
  };
  
  const handleCancelEdit = () => {
    setEditingNotes(false);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: `${Math.round(file.size / 1024)} KB`
      }));
      
      setFiles([...files, ...newFiles]);
      toast.success(`${newFiles.length} file(s) uploaded successfully`);
    }
  };
  
  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
    toast.success("File removed successfully");
  };
  
  const handleMeetingClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setMeetingDetailsOpen(true);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <StakeholderLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mediation Preparation</h2>
          <p className="text-muted-foreground">
            Prepare for your upcoming mediation sessions
          </p>
        </div>
        
        {upcomingMeetings.length > 0 && (
          <Card className="bg-[#5fb455]/5 border-[#5fb455]/20">
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Mediation</CardTitle>
              <CardDescription>
                Your next scheduled mediation session
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingMeetings.map(meeting => (
                <div 
                  key={meeting.id}
                  className="flex items-center justify-between p-3 bg-card rounded-md border cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => handleMeetingClick(meeting)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#5fb455]/10 rounded-full">
                      <Calendar className="h-5 w-5 text-[#5fb455]" />
                    </div>
                    <div>
                      <p className="font-medium">{formatDate(meeting.date)}</p>
                      <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{meeting.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notes Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>My Notes</CardTitle>
                <CardDescription>
                  Things to remember during mediation
                </CardDescription>
              </div>
              {!editingNotes ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setEditingNotes(true)}
                  className="ml-auto"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCancelEdit}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSaveNotes}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {!editingNotes ? (
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {mediationNotes}
                </div>
              ) : (
                <Textarea 
                  value={mediationNotes}
                  onChange={e => setMediationNotes(e.target.value)}
                  className="resize-none"
                  rows={8}
                  placeholder="Add notes, reminders, or points you want to remember for the mediation session..."
                />
              )}
              
              <div className="mt-4 text-xs text-muted-foreground p-3 bg-[#5fb455]/5 rounded-md">
                <p className="font-medium mb-1">Helpful Tips:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Prepare specific examples to share</li>
                  <li>Note down your desired outcomes</li>
                  <li>Think about compromises you're willing to make</li>
                  <li>Write down questions you want answered</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Files Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>My Documents</CardTitle>
                <CardDescription>
                  Supporting files for your mediation
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="relative"
              >
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  onChange={handleFileUpload}
                  multiple
                  aria-label="Upload files"
                />
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {files.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Paperclip className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No files uploaded yet</p>
                    <p className="text-xs mt-1">Upload files to support your mediation preparation</p>
                  </div>
                ) : (
                  files.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-3 border rounded-md bg-card">
                      <div className="flex items-center gap-3">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFile(file.id)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label={`Delete ${file.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground p-3 bg-[#5fb455]/5 rounded-md">
                <p className="font-medium mb-1">Recommended Documents:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Class schedules or timetables</li>
                  <li>Evidence of communication</li>
                  <li>Relevant school policies</li>
                  <li>Supporting testimonials</li>
                </ul>
              </div>
              
              <Alert className="mt-4 bg-amber-50 text-amber-700 border-amber-100">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  All documents you upload here will be visible to your mediator but not to other stakeholders unless explicitly shared during mediation.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={meetingDetailsOpen} onOpenChange={setMeetingDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Mediation Session Details</DialogTitle>
            <DialogDescription>
              Information about your upcoming mediation
            </DialogDescription>
          </DialogHeader>
          
          {selectedMeeting && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#5fb455]/10 rounded-full">
                  <Calendar className="h-5 w-5 text-[#5fb455]" />
                </div>
                <div>
                  <p className="font-medium">{formatDate(selectedMeeting.date)}</p>
                  <p className="text-sm text-muted-foreground">{selectedMeeting.time}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#5fb455]/10 rounded-full">
                  <Users className="h-5 w-5 text-[#5fb455]" />
                </div>
                <div>
                  <p className="font-medium">Participants</p>
                  <ul className="text-sm text-muted-foreground">
                    {selectedMeeting.participants.map((participant, index) => (
                      <li key={index}>{participant}</li>
                    ))}
                    <li>You</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-[#5fb455]/5 p-4 rounded-md">
                <h4 className="font-medium mb-2">Mediation Tips</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#5fb455] mt-0.5" />
                    <span>Arrive 5-10 minutes early to settle in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#5fb455] mt-0.5" />
                    <span>Bring any materials you've prepared in the Mediation Prep tab</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#5fb455] mt-0.5" />
                    <span>Be open to listening to other perspectives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#5fb455] mt-0.5" />
                    <span>Remember to take deep breaths if you feel overwhelmed</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button 
              className="bg-[#5fb455] hover:bg-[#4ea344]"
              onClick={() => setMeetingDetailsOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </StakeholderLayout>
  );
};

export default StakeholderMediationPrep;
