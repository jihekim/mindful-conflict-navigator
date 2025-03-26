
import React, { useState } from 'react';
import { CalendarDays, MessageSquare, Plus, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const mockMeetings = [
  {
    id: '1',
    title: 'Initial Mediation Session',
    caseId: '1',
    caseName: 'Classroom Dispute: 9A',
    date: '2023-10-15T14:00:00',
    status: 'Upcoming',
    location: 'Counseling Office 2B',
    stakeholders: ['Student A', 'Student B', 'Teacher Jones'],
    notes: 'First mediation session to understand perspectives from all parties.'
  },
  {
    id: '2',
    title: 'Follow-up Session',
    caseId: '1',
    caseName: 'Classroom Dispute: 9A',
    date: '2023-10-22T14:00:00',
    status: 'Upcoming',
    location: 'Counseling Office 2B',
    stakeholders: ['Student A', 'Student B'],
    notes: 'Follow-up session to check progress and discuss next steps.'
  },
  {
    id: '3',
    title: 'Parent-Teacher Conference',
    caseId: '1',
    caseName: 'Classroom Dispute: 9A',
    date: '2023-10-25T16:30:00',
    status: 'Upcoming',
    location: 'Conference Room A',
    stakeholders: ['Student A', 'Student B', 'Teacher Jones', 'Parent A', 'Parent B'],
    notes: 'Meeting with parents to discuss resolution progress and gather family support.'
  },
  {
    id: '4',
    title: 'Initial Assessment',
    caseId: '2',
    caseName: 'Lunchroom Incident',
    date: '2023-10-10T13:00:00',
    status: 'Past',
    location: 'Counseling Office 1A',
    stakeholders: ['Student C', 'Student D', 'Cafeteria Staff'],
    notes: 'Initial meeting to gather information about the lunchroom incident.'
  },
  {
    id: '5',
    title: 'Conflict Resolution Session',
    caseId: '2',
    caseName: 'Lunchroom Incident',
    date: '2023-10-12T13:00:00',
    status: 'Past',
    location: 'Counseling Office 1A',
    stakeholders: ['Student C', 'Student D'],
    notes: 'Facilitated discussion between students to address the conflict.'
  }
];

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState<any>(null);
  const [messageText, setMessageText] = useState('');
  
  const filteredMeetings = mockMeetings.filter(meeting => 
    (meeting.status.toLowerCase() === activeTab || activeTab === 'all') &&
    (meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     meeting.caseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     meeting.stakeholders.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())))
  );
  
  const handleOpenMessageDialog = (meeting: any) => {
    setCurrentMeeting(meeting);
    setMessageDialogOpen(true);
  };
  
  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    // In a real app, this would send the message to the backend
    toast.success(`Message sent to ${currentMeeting.stakeholders.join(', ')}`);
    setMessageText('');
    setMessageDialogOpen(false);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric'
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    });
  };
  
  return (
    <Layout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Schedule</h1>
            <p className="text-muted-foreground mt-1">
              Manage and view all mediation sessions
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule New Meeting
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search meetings by title, case, or stakeholders..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="px-6 py-4 border-b">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="all">All Meetings</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="px-0 py-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {filteredMeetings.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No meetings found</p>
                  <p className="text-sm mt-1">Try adjusting your search criteria</p>
                </div>
              ) : (
                filteredMeetings.map(meeting => (
                  <Card key={meeting.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{meeting.title}</CardTitle>
                        <div className={`px-2 py-1 text-xs rounded-full ${
                          meeting.status === 'Upcoming' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {meeting.status}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Case: {meeting.caseName}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="text-sm mb-1">
                          <CalendarDays className="h-3 w-3 inline-block mr-1" />
                          <span className="font-medium">{formatDate(meeting.date)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {formatTime(meeting.date)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {meeting.location}
                        </div>
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="mt-3 mb-4">
                        <div className="text-xs font-medium uppercase text-muted-foreground mb-2">
                          Stakeholders
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {meeting.stakeholders.map((stakeholder: string, index: number) => (
                            <div key={index} className="flex items-center mr-2 mb-1">
                              <Avatar className="h-6 w-6 mr-1">
                                <AvatarFallback className="text-xs">
                                  {stakeholder.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{stakeholder}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => handleOpenMessageDialog(meeting)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message Stakeholders
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Message Stakeholders</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {currentMeeting && (
              <>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Meeting</h4>
                  <p className="text-sm">{currentMeeting.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(currentMeeting.date)} at {formatTime(currentMeeting.date)}
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Recipients</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentMeeting.stakeholders.map((stakeholder: string, index: number) => (
                      <div 
                        key={index} 
                        className="bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-1"
                      >
                        {stakeholder}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Message</h4>
                  <Textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message here..."
                    rows={5}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Schedule;
