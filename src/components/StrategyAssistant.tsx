
import React, { useEffect, useState } from 'react';
import { MessageList } from './strategy-assistant/MessageList';
import { MessageInput } from './strategy-assistant/MessageInput';
import { useStrategyAssistant } from './strategy-assistant/useStrategyAssistant';
import { CaseDetails } from './strategy-assistant/types';

interface StrategyAssistantProps {
  caseId: string;
}

const StrategyAssistant: React.FC<StrategyAssistantProps> = ({ caseId }) => {
  const [caseDetails, setCaseDetails] = useState<CaseDetails | null>(null);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      if (!caseId) return;
      
      const mockCaseDetails: { [key: string]: CaseDetails } = {
        '1': {
          id: '1',
          title: 'Classroom Dispute: 9A',
          stakeholders: ['Student A', 'Student B', 'Teacher Jones'],
          status: 'New',
          dateCreated: '2023-06-10',
          timeline: [
            {
              id: '1-1',
              title: 'Initial Verbal Exchange',
              description: 'Student A made a comment about Student B\'s presentation that B found hurtful.',
              date: '2023-06-08',
              tag: 'Trigger',
              stakeholder: 'Student A'
            },
            {
              id: '1-2',
              title: 'Physical Altercation',
              description: 'Student B pushed Student A after class while leaving the room.',
              date: '2023-06-08',
              tag: 'Escalation',
              stakeholder: 'Student B'
            },
            {
              id: '1-3',
              title: 'Teacher Intervention',
              description: 'Teacher Jones separated students but didn\'t address underlying issue.',
              date: '2023-06-08',
              stakeholder: 'Teacher Jones'
            },
            {
              id: '1-4',
              title: 'Continued Tension',
              description: 'Students refused to work together on group project.',
              date: '2023-06-09',
              tag: 'Escalation'
            }
          ],
          cynefinDomain: 'Complex',
          cynefinRationale: 'This conflict is currently in the Complex domain due to conflicting emotional narratives and unclear intentions from both sides. The situation involves multiple perspectives and emotional factors that are difficult to fully understand. Standard disciplinary approaches may not address the underlying relationship issues.'
        },
        '2': {
          id: '2',
          title: 'Lunchroom Incident',
          stakeholders: ['Student C', 'Cafeteria Staff', 'Student D'],
          status: 'In Progress',
          dateCreated: '2023-06-08',
          timeline: [
            {
              id: '2-1',
              title: 'Lunch Line Disagreement',
              description: 'Student C accused Student D of cutting the lunch line.',
              date: '2023-06-07',
              tag: 'Trigger',
              stakeholder: 'Student C'
            },
            {
              id: '2-2',
              title: 'Food Throwing Incident',
              description: 'Student D allegedly threw food toward Student C\'s table.',
              date: '2023-06-07',
              tag: 'Escalation',
              stakeholder: 'Student D'
            },
            {
              id: '2-3',
              title: 'Staff Intervention',
              description: 'Cafeteria staff reported both students to administration.',
              date: '2023-06-07',
              stakeholder: 'Cafeteria Staff'
            }
          ],
          cynefinDomain: 'Complicated',
          cynefinRationale: 'This conflict appears to be in the Complicated domain because while there is a clear sequence of events, understanding the social dynamics and group loyalties requires expert analysis. There are established protocols for lunchroom behavior but we need a deeper understanding of the social context.'
        }
      };
      
      setCaseDetails(mockCaseDetails[caseId] || null);
    };
    
    fetchCaseDetails();
  }, [caseId]);

  const { messages, isLoading, sendMessage } = useStrategyAssistant({ 
    caseId,
    caseDetails
  });

  return (
    <div className="bg-card rounded-xl shadow-subtle overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">AI Strategy Assistant</h3>
      </div>
      
      <MessageList 
        messages={messages} 
        isLoading={isLoading} 
      />
      
      <div className="p-4 border-t border-border">
        <MessageInput 
          onSendMessage={sendMessage} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default StrategyAssistant;
