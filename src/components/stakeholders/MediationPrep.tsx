
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Edit2, CheckCircle, XCircle, Upload, Paperclip, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface MediationPrepProps {
  stakeholder: any;
  onBack: () => void;
}

const MediationPrep: React.FC<MediationPrepProps> = ({ 
  stakeholder, 
  onBack 
}) => {
  const [editingNotes, setEditingNotes] = useState(false);
  const [mediationNotes, setMediationNotes] = useState(
    "Prepare for initial conversation by asking about their interests outside of school. " +
    "Avoid direct confrontation about the incident at first. " +
    "Use reflective listening techniques when they describe their perspective."
  );
  
  // Mock files for demonstration purposes
  const [files, setFiles] = useState([
    { id: '1', name: 'Previous mediation summary.pdf', type: 'application/pdf', size: '245 KB' },
    { id: '2', name: 'Classroom seating chart.jpg', type: 'image/jpeg', size: '180 KB' }
  ]);
  
  const handleSaveNotes = () => {
    // In a real app, this would save to the backend
    setEditingNotes(false);
    toast.success("Mediation notes updated successfully");
  };
  
  const handleCancelEdit = () => {
    setEditingNotes(false);
    // Reset to original notes in a real application
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
  
  return (
    <div className="p-6">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Stakeholders
      </Button>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Mediation Preparation</h2>
        <p className="text-muted-foreground mt-1">
          Prepare for mediation with {stakeholder.name}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mediation Notes Section */}
        <div className="bg-card rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Preparation Notes</h3>
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
            <div className="text-sm text-muted-foreground whitespace-pre-wrap">
              {mediationNotes}
            </div>
          ) : (
            <Textarea 
              value={mediationNotes}
              onChange={e => setMediationNotes(e.target.value)}
              className="resize-none"
              rows={8}
              placeholder="Add notes, reminders, or strategies for the mediation session..."
            />
          )}
        </div>
        
        {/* Mediation Files Section */}
        <div className="bg-card rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Multimedia Resources</h3>
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
              />
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </div>
          
          <div className="space-y-3">
            {files.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Paperclip className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No files uploaded yet</p>
                <p className="text-xs mt-1">Upload files to support your mediation preparation</p>
              </div>
            ) : (
              files.map(file => (
                <div key={file.id} className="flex items-center justify-between p-3 border rounded-md bg-background">
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
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediationPrep;
