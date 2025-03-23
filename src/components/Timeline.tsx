
import React, { useState } from 'react';
import { Calendar, Edit, Plus, Tag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  tag?: 'Trigger' | 'Escalation' | 'Resolution' | undefined;
  stakeholder?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  onUpdateEvents: (events: TimelineEvent[]) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onUpdateEvents }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<TimelineEvent | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<TimelineEvent>>({
    id: '',
    title: '',
    description: '',
    date: '',
    tag: undefined,
    stakeholder: ''
  });

  const handleAddEvent = () => {
    const event: TimelineEvent = {
      id: Date.now().toString(),
      title: newEvent.title || '',
      description: newEvent.description || '',
      date: newEvent.date || new Date().toISOString().split('T')[0],
      tag: newEvent.tag as TimelineEvent['tag'],
      stakeholder: newEvent.stakeholder
    };
    
    onUpdateEvents([...events, event]);
    setNewEvent({
      id: '',
      title: '',
      description: '',
      date: '',
      tag: undefined,
      stakeholder: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleEditEvent = () => {
    if (!currentEvent) return;
    
    const updatedEvents = events.map(event => 
      event.id === currentEvent.id ? currentEvent : event
    );
    
    onUpdateEvents(updatedEvents);
    setIsEditDialogOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    onUpdateEvents(updatedEvents);
  };

  const getTagColor = (tag?: string) => {
    switch (tag) {
      case 'Trigger':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Escalation':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Resolution':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Timeline of Events</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>
      
      <div className="timeline-container">
        <AnimatePresence>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="timeline-item"
            >
              <div className="bg-card shadow-subtle rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setCurrentEvent(event);
                        setIsEditDialogOpen(true);
                      }}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    {event.tag && (
                      <span className={`px-2 py-0.5 rounded-full border ${getTagColor(event.tag)}`}>
                        {event.tag}
                      </span>
                    )}
                    
                    {event.stakeholder && (
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                        {event.stakeholder}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Add Event Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Timeline Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Event title"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Event description"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <Input
                id="date"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="tag" className="text-sm font-medium">Tag</label>
                <Select
                  value={newEvent.tag}
                  onValueChange={(value) => setNewEvent({...newEvent, tag: value as TimelineEvent['tag']})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Trigger">Trigger</SelectItem>
                    <SelectItem value="Escalation">Escalation</SelectItem>
                    <SelectItem value="Resolution">Resolution</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="stakeholder" className="text-sm font-medium">Stakeholder</label>
                <Input
                  id="stakeholder"
                  value={newEvent.stakeholder}
                  onChange={(e) => setNewEvent({...newEvent, stakeholder: e.target.value})}
                  placeholder="Stakeholder name"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Timeline Event</DialogTitle>
          </DialogHeader>
          {currentEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-title" className="text-sm font-medium">Title</label>
                <Input
                  id="edit-title"
                  value={currentEvent.title}
                  onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="edit-description"
                  value={currentEvent.description}
                  onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-date" className="text-sm font-medium">Date</label>
                <Input
                  id="edit-date"
                  type="date"
                  value={currentEvent.date}
                  onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="edit-tag" className="text-sm font-medium">Tag</label>
                  <Select
                    value={currentEvent.tag}
                    onValueChange={(value) => setCurrentEvent({...currentEvent, tag: value as TimelineEvent['tag']})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Trigger">Trigger</SelectItem>
                      <SelectItem value="Escalation">Escalation</SelectItem>
                      <SelectItem value="Resolution">Resolution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="edit-stakeholder" className="text-sm font-medium">Stakeholder</label>
                  <Input
                    id="edit-stakeholder"
                    value={currentEvent.stakeholder}
                    onChange={(e) => setCurrentEvent({...currentEvent, stakeholder: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditEvent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Timeline;
