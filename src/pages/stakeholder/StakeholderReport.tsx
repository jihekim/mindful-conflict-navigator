
import React, { useState } from 'react';
import StakeholderLayout from '@/components/StakeholderLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Info, Edit2, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const StakeholderReport = () => {
  const { currentUser } = useAuth();

  // Mock report data
  const [reportData, setReportData] = useState({
    emotionalStates: ['Frustration', 'Anxiety', 'Hope'],
    triggerPoints: ['Perceived unfair treatment', 'Misunderstanding of intentions'],
    desiredOutcomes: ['Understanding', 'Resolution', 'Moving forward'],
    summary: `Based on our conversation, it appears that this situation stems from a misunderstanding that escalated when emotions were running high. ${currentUser?.name} has expressed feeling unheard and dismissed in the initial interaction, which led to frustration and anxiety. However, there's a strong desire to find resolution and move forward in a positive manner. The main trigger points were around perceived unfair treatment and miscommunication of intentions. With proper mediation, this situation has a good chance of positive resolution.`
  });

  // Editing state
  const [isEditingEmotions, setIsEditingEmotions] = useState(false);
  const [isEditingTriggers, setIsEditingTriggers] = useState(false);
  const [isEditingOutcomes, setIsEditingOutcomes] = useState(false);
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  
  // Editing temporary values
  const [editingEmotion, setEditingEmotion] = useState('');
  const [editingTrigger, setEditingTrigger] = useState('');
  const [editingOutcome, setEditingOutcome] = useState('');
  const [editingSummary, setEditingSummary] = useState(reportData.summary);
  
  // Regeneration dialog
  const [regenerationReason, setRegenerationReason] = useState('');
  const [regenerationOpen, setRegenerationOpen] = useState(false);

  // Handle adding new items
  const handleAddEmotion = () => {
    if (editingEmotion.trim()) {
      setReportData(prev => ({
        ...prev,
        emotionalStates: [...prev.emotionalStates, editingEmotion.trim()]
      }));
      setEditingEmotion('');
      toast.success('Emotional state added');
    }
  };

  const handleAddTrigger = () => {
    if (editingTrigger.trim()) {
      setReportData(prev => ({
        ...prev,
        triggerPoints: [...prev.triggerPoints, editingTrigger.trim()]
      }));
      setEditingTrigger('');
      toast.success('Trigger point added');
    }
  };

  const handleAddOutcome = () => {
    if (editingOutcome.trim()) {
      setReportData(prev => ({
        ...prev,
        desiredOutcomes: [...prev.desiredOutcomes, editingOutcome.trim()]
      }));
      setEditingOutcome('');
      toast.success('Desired outcome added');
    }
  };

  // Handle removing items
  const handleRemoveEmotion = (index: number) => {
    setReportData(prev => ({
      ...prev,
      emotionalStates: prev.emotionalStates.filter((_, i) => i !== index)
    }));
    toast.success('Emotional state removed');
  };

  const handleRemoveTrigger = (index: number) => {
    setReportData(prev => ({
      ...prev,
      triggerPoints: prev.triggerPoints.filter((_, i) => i !== index)
    }));
    toast.success('Trigger point removed');
  };

  const handleRemoveOutcome = (index: number) => {
    setReportData(prev => ({
      ...prev,
      desiredOutcomes: prev.desiredOutcomes.filter((_, i) => i !== index)
    }));
    toast.success('Desired outcome removed');
  };

  // Handle summary update
  const handleSaveSummary = () => {
    setReportData(prev => ({
      ...prev,
      summary: editingSummary
    }));
    setIsEditingSummary(false);
    toast.success('Summary updated');
  };

  // Handle report regeneration
  const handleRegenerateReport = () => {
    // In a real app, this would call an API
    toast.success('Your report is being regenerated');
    setRegenerationOpen(false);
    
    // Simulate regeneration
    setTimeout(() => {
      toast.success('Report regenerated successfully');
    }, 2000);
  };

  return (
    <StakeholderLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Your Insight Report</h2>
            <p className="text-muted-foreground">
              This report summarizes the key insights from your conversation with the AI assistant
            </p>
          </div>
          
          <Dialog open={regenerationOpen} onOpenChange={setRegenerationOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Request Regeneration
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Regenerate Your Report</DialogTitle>
                <DialogDescription>
                  Please share why you'd like your report regenerated and any specific aspects you want included or emphasized.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Textarea
                  placeholder="I'd like more emphasis on..."
                  value={regenerationReason}
                  onChange={(e) => setRegenerationReason(e.target.value)}
                  className="resize-none"
                  rows={5}
                />
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setRegenerationOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-[#5fb455] hover:bg-[#4ea344]"
                  onClick={handleRegenerateReport}
                >
                  Submit Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Emotional Analysis</CardTitle>
              <CardDescription>
                Key emotions identified in your conversation
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditingEmotions(!isEditingEmotions)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              {isEditingEmotions ? 'Done' : 'Edit'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              {reportData.emotionalStates.map((emotion, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className={isEditingEmotions ? "pr-1" : ""}
                >
                  {emotion}
                  {isEditingEmotions && (
                    <button 
                      className="ml-1 rounded-full hover:bg-accent p-1"
                      onClick={() => handleRemoveEmotion(index)}
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))}
              {isEditingEmotions && (
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add emotion..."
                    value={editingEmotion}
                    onChange={(e) => setEditingEmotion(e.target.value)}
                    className="w-32 h-8"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddEmotion();
                      }
                    }}
                  />
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleAddEmotion}
                    className="h-8"
                  >
                    Add
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Trigger Points</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditingTriggers(!isEditingTriggers)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                {isEditingTriggers ? 'Done' : 'Edit'}
              </Button>
            </div>
            <ul className="space-y-2 mb-6">
              {reportData.triggerPoints.map((trigger, index) => (
                <li key={index} className="flex items-start justify-between group">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{trigger}</span>
                  </div>
                  {isEditingTriggers && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveTrigger(index)}
                    >
                      ×
                    </Button>
                  )}
                </li>
              ))}
              {isEditingTriggers && (
                <li className="flex items-center gap-2 mt-2">
                  <AlertCircle className="h-5 w-5 mr-2 text-amber-500 flex-shrink-0" />
                  <Input
                    placeholder="Add trigger point..."
                    value={editingTrigger}
                    onChange={(e) => setEditingTrigger(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTrigger();
                      }
                    }}
                  />
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleAddTrigger}
                  >
                    Add
                  </Button>
                </li>
              )}
            </ul>
            
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Desired Outcomes</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditingOutcomes(!isEditingOutcomes)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                {isEditingOutcomes ? 'Done' : 'Edit'}
              </Button>
            </div>
            <ul className="space-y-2">
              {reportData.desiredOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start justify-between group">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                  {isEditingOutcomes && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveOutcome(index)}
                    >
                      ×
                    </Button>
                  )}
                </li>
              ))}
              {isEditingOutcomes && (
                <li className="flex items-center gap-2 mt-2">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                  <Input
                    placeholder="Add desired outcome..."
                    value={editingOutcome}
                    onChange={(e) => setEditingOutcome(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddOutcome();
                      }
                    }}
                  />
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleAddOutcome}
                  >
                    Add
                  </Button>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Narrative Summary</CardTitle>
              <CardDescription>
                AI-generated summary of your situation
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                if (!isEditingSummary) {
                  setEditingSummary(reportData.summary);
                  setIsEditingSummary(true);
                } else {
                  handleSaveSummary();
                }
              }}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              {isEditingSummary ? 'Save' : 'Edit'}
            </Button>
          </CardHeader>
          <CardContent>
            {!isEditingSummary ? (
              <p className="text-sm leading-relaxed">{reportData.summary}</p>
            ) : (
              <div className="space-y-2">
                <Textarea
                  value={editingSummary}
                  onChange={(e) => setEditingSummary(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setIsEditingSummary(false);
                      setEditingSummary(reportData.summary);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSaveSummary}
                    className="bg-[#5fb455] hover:bg-[#4ea344]"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-6">
            <div className="flex items-start text-sm text-muted-foreground">
              <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
              <p>This summary was automatically generated based on your conversation. It is not a clinical assessment or diagnosis.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </StakeholderLayout>
  );
};

export default StakeholderReport;
