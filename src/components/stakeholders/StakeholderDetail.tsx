
import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Edit2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface StakeholderDetailProps {
  stakeholder: any;
  onBack: () => void;
}

const StakeholderDetail: React.FC<StakeholderDetailProps> = ({ 
  stakeholder, 
  onBack 
}) => {
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(stakeholder.notes);
  
  const handleSaveNotes = () => {
    // In a real app, this would save to the backend
    setEditingNotes(false);
    toast.success("Notes updated successfully");
  };
  
  const handleCancelEdit = () => {
    setNotes(stakeholder.notes);
    setEditingNotes(false);
  };
  
  return (
    <div className="p-6">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Stakeholders
      </Button>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Stakeholder Profile Column */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {stakeholder.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{stakeholder.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-1">
                  {stakeholder.role}
                </span>
                <span className="text-sm text-muted-foreground">
                  Case: {stakeholder.caseName}
                </span>
              </div>
            </div>
          </div>

          {/* Counselor Notes Section */}
          <div className="bg-card rounded-lg border p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Counselor Notes</h3>
              {!editingNotes ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setEditingNotes(true)}
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
            </div>
            
            {!editingNotes ? (
              <p className="text-sm text-muted-foreground">{notes}</p>
            ) : (
              <Textarea 
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="resize-none"
                rows={4}
              />
            )}
          </div>
          
          {/* Story Report Section */}
          <div className="bg-card rounded-lg border p-4 mb-6">
            <h3 className="font-medium mb-3">Story Report Summary</h3>
            <p className="text-sm text-muted-foreground">{stakeholder.storyReport}</p>
          </div>
        </div>
        
        {/* Stakeholder Details Column */}
        <div className="flex-1">
          {/* Trigger Points Section */}
          <div className="bg-card rounded-lg border p-4 mb-6">
            <h3 className="font-medium mb-3">Trigger Points</h3>
            <ul className="space-y-2">
              {stakeholder.triggerPoints.map((trigger: string, index: number) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                  <span>{trigger}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Wishes Section */}
          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-medium mb-3">Wishes & Goals</h3>
            <ul className="space-y-2">
              {stakeholder.wishes.map((wish: string, index: number) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{wish}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholderDetail;
