
import React from 'react';
import StakeholderLayout from '@/components/StakeholderLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const StakeholderReport = () => {
  const { currentUser } = useAuth();

  // This would come from a real API in a production app
  const mockReport = {
    emotionalStates: ['Frustration', 'Anxiety', 'Hope'],
    triggerPoints: ['Perceived unfair treatment', 'Misunderstanding of intentions'],
    desiredOutcomes: ['Understanding', 'Resolution', 'Moving forward'],
    summary: `Based on our conversation, it appears that this situation stems from a misunderstanding that escalated when emotions were running high. ${currentUser?.name} has expressed feeling unheard and dismissed in the initial interaction, which led to frustration and anxiety. However, there's a strong desire to find resolution and move forward in a positive manner. The main trigger points were around perceived unfair treatment and miscommunication of intentions. With proper mediation, this situation has a good chance of positive resolution.`
  };

  return (
    <StakeholderLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your Insight Report</h2>
          <p className="text-muted-foreground">
            This report summarizes the key insights from your conversation with the AI assistant.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Emotional Analysis</CardTitle>
            <CardDescription>
              Key emotions identified in your conversation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              {mockReport.emotionalStates.map((emotion, index) => (
                <Badge key={index} variant="secondary">{emotion}</Badge>
              ))}
            </div>
            
            <h4 className="font-medium mb-2">Trigger Points</h4>
            <ul className="space-y-2 mb-6">
              {mockReport.triggerPoints.map((trigger, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{trigger}</span>
                </li>
              ))}
            </ul>
            
            <h4 className="font-medium mb-2">Desired Outcomes</h4>
            <ul className="space-y-2">
              {mockReport.desiredOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Narrative Summary</CardTitle>
            <CardDescription>
              AI-generated summary of your situation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{mockReport.summary}</p>
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
