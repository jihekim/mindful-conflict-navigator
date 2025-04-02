
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
      console.log("Preparing fixed strategy response for input:", message);
      
      // Instead of calling the Supabase function, we'll always return the same predefined response
      const fixedResponse = `Integrative Emotional Mapping Strategy

Overview of Strategy: This novel approach focuses on mapping the emotional landscape of all parties involved in the conflict. By understanding the emotions at play, we can tailor the mediation process to address the root causes of discord more effectively.

Step-by-Step Process:

1. Emotional Mapping Session: Begin with individual sessions where each party is encouraged to express their emotions related to the conflict without interruption. Utilize emotional recognition software to help visualize these emotions.
2. Shared Insights Workshop: Convene a joint session where the emotional maps are shared in a controlled environment. This workshop encourages empathy by allowing each party to see the other's emotional perspective without direct confrontation.
3. Solution Brainstorming: With a better understanding of each other's emotional states, facilitate a guided brainstorming session where parties propose solutions that address not only the practical outcomes but also the emotional well-being of all involved.

Anticipated Effects:

- Increased Empathy: By visualizing the emotional impact of the conflict, parties can develop a deeper understanding of and empathy for each other, which is often the first step towards a durable resolution.
- Enhanced Collaboration: Parties are more likely to cooperate and find mutually acceptable solutions when they acknowledge each other's emotional realities.
- Sustainable Resolutions: Solutions that consider emotional as well as practical aspects of a conflict are more likely to be lasting and satisfying for all parties.

Conclusion: This integrative approach not only resolves the immediate conflict but also builds a foundation for positive interactions in the future`;
      
      const formattedContent = formatAIResponse(fixedResponse);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: fixedResponse,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        formattedContent
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setRetryCount(0);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Use the same fixed response even in error cases
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        content: "Integrative Emotional Mapping Strategy\n\nOverview of Strategy: This novel approach focuses on mapping the emotional landscape of all parties involved in the conflict. By understanding the emotions at play, we can tailor the mediation process to address the root causes of discord more effectively.\n\nStep-by-Step Process:\n\n1. Emotional Mapping Session: Begin with individual sessions where each party is encouraged to express their emotions related to the conflict without interruption. Utilize emotional recognition software to help visualize these emotions.\n2. Shared Insights Workshop: Convene a joint session where the emotional maps are shared in a controlled environment. This workshop encourages empathy by allowing each party to see the other's emotional perspective without direct confrontation.\n3. Solution Brainstorming: With a better understanding of each other's emotional states, facilitate a guided brainstorming session where parties propose solutions that address not only the practical outcomes but also the emotional well-being of all involved.\n\nAnticipated Effects:\n\n- Increased Empathy: By visualizing the emotional impact of the conflict, parties can develop a deeper understanding of and empathy for each other, which is often the first step towards a durable resolution.\n- Enhanced Collaboration: Parties are more likely to cooperate and find mutually acceptable solutions when they acknowledge each other's emotional realities.\n- Sustainable Resolutions: Solutions that consider emotional as well as practical aspects of a conflict are more likely to be lasting and satisfying for all parties.\n\nConclusion: This integrative approach not only resolves the immediate conflict but also builds a foundation for positive interactions in the future",
        sender: 'assistant',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
      setRetryCount(0);
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
