
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Edit2, CheckCircle, XCircle, Upload, Paperclip, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import StakeholderLayout from '@/components/StakeholderLayout';

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
  
  return (
    <StakeholderLayout>
      <div className="bg-card rounded-lg border p-6">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">Mediation Preparation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notes Section */}
          <div className="bg-background rounded-lg border p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">My Notes</h3>
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
                placeholder="Add notes, reminders, or points you want to remember for the mediation session..."
              />
            )}
            
            <div className="mt-4 text-xs text-muted-foreground">
              <p className="font-medium mb-1">Helpful Tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Prepare specific examples to share</li>
                <li>Note down your desired outcomes</li>
                <li>Think about compromises you're willing to make</li>
                <li>Write down questions you want answered</li>
              </ul>
            </div>
          </div>
          
          {/* Files Section */}
          <div className="bg-background rounded-lg border p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">My Documents</h3>
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
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-4 text-xs text-muted-foreground">
              <p className="font-medium mb-1">Recommended Documents:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Class schedules or timetables</li>
                <li>Evidence of communication</li>
                <li>Relevant school policies</li>
                <li>Supporting testimonials</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </StakeholderLayout>
  );
};

export default StakeholderMediationPrep;
