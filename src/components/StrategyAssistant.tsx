
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  tag?: string;
  stakeholder?: string;
}

interface CaseDetails {
  id: string;
  title: string;
  stakeholders: string[];
  status: 'New' | 'In Progress' | 'Resolved';
  dateCreated: string;
  timeline: TimelineEvent[];
  cynefinDomain: 'Clear' | 'Complicated' | 'Complex' | 'Chaotic';
  cynefinRationale: string;
}

interface StrategyAssistantProps {
  caseId: string;
}

const StrategyAssistant: React.FC<StrategyAssistantProps> = ({ caseId }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello counselor, I'm your AI Strategy Assistant. I've analyzed this case and can help you develop effective conflict resolution strategies. What would you like to know?",
      sender: 'assistant',
      timestamp: new Date().toISOString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [caseDetails, setCaseDetails] = useState<CaseDetails | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  // Fetch case details (using mock data in this example)
  useEffect(() => {
    const fetchCaseDetails = async () => {
      if (!caseId) return;
      
      // For demo purposes, we're using mock data
      // In a real app, this would be fetched from Supabase
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
  
  const getAIResponse = async (message: string) => {
    setIsLoading(true);
    
    try {
      console.log("Calling strategy-assistant function with case details:", { caseId });
      
      const { data, error } = await supabase.functions.invoke('strategy-assistant', {
        body: { message, caseDetails },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: 'assistant',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Only show toast if we're out of retries
      if (retryCount >= maxRetries) {
        toast.error('Failed to get AI response. The system will provide a fallback response.');
        
        // Provide a fallback response
        const fallbackMessage: Message = {
          id: Date.now().toString(),
          content: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Based on what I can see in this case, I would recommend focusing on understanding each student's perspective through individual conversations. Since this appears to be in the Complex domain, consider using mediation techniques that create a safe space for both parties to express themselves without judgment.",
          sender: 'assistant',
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, fallbackMessage]);
        setRetryCount(0); // Reset retry count after fallback
      } else {
        // Increment retry count and attempt again with a simpler prompt
        setRetryCount(prev => prev + 1);
        return getAIResponse("Please provide a brief strategy suggestion"); // Simpler prompt for retry
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Get AI response
    getAIResponse(newMessage);
  };
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-card rounded-xl shadow-subtle overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">AI Strategy Assistant</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4 h-[400px]" ref={scrollAreaRef}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
                <div className="flex-shrink-0 mr-3">
                  {message.sender === 'assistant' ? (
                    <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                      <span className="text-xs">AI</span>
                    </Avatar>
                  ) : (
                    <Avatar className="w-8 h-8 bg-secondary text-secondary-foreground">
                      <span className="text-xs">C</span>
                    </Avatar>
                  )}
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-3'
                      : 'bg-accent text-accent-foreground mr-3'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start mb-4"
            >
              <div className="flex items-center bg-accent rounded-lg p-3">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>
      
      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask about strategies..."
            className="flex-1 mr-2"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
      
      <style>
        {`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 2px;
          background-color: currentColor;
          border-radius: 50%;
          opacity: 0.4;
          animation: bounce 1.5s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        `}
      </style>
    </div>
  );
};

export default StrategyAssistant;
