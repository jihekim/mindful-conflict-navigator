
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Message, CaseDetails } from './types';
import { formatAIResponse } from './formatAIResponse';

interface UseStrategyAssistantProps {
  caseId: string;
  initialMessages?: Message[];
  caseDetails?: CaseDetails | null;
}

export const useStrategyAssistant = ({
  caseId,
  initialMessages = [{
    id: '1',
    content: "Hello counselor, I'm your AI Strategy Assistant. I've analyzed this case and can help you develop effective conflict resolution strategies. What would you like to know?",
    sender: 'assistant',
    timestamp: new Date().toISOString()
  }],
  caseDetails = null
}: UseStrategyAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

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
      
      const formattedContent = formatAIResponse(data.response);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        formattedContent
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setRetryCount(0);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      if (retryCount >= maxRetries) {
        toast.error('Failed to get AI response. The system will provide a fallback response.');
        
        const fallbackMessage: Message = {
          id: Date.now().toString(),
          content: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Based on what I can see in this case, I would recommend focusing on understanding each student's perspective through individual conversations. Since this appears to be in the Complex domain, consider using mediation techniques that create a safe space for both parties to express themselves without judgment.",
          sender: 'assistant',
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, fallbackMessage]);
        setRetryCount(0);
      } else {
        setRetryCount(prev => prev + 1);
        return getAIResponse("Please provide a brief strategy suggestion");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    getAIResponse(text);
  };

  return {
    messages,
    isLoading,
    sendMessage
  };
};
