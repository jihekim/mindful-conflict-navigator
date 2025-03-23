
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Simulated AI response for demo purposes
  const simulateAIResponse = (message: string) => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const aiResponses = [
        "Based on the timeline, I notice this conflict moved from Clear to Complex when the teacher got involved. Consider a circle-based dialogue where each stakeholder can share their perception without interruption.",
        "Since this is in the Complex domain, I recommend trying emergent practices rather than prescriptive solutions. Perhaps start with individual reflections before bringing the parties together.",
        "The timeline suggests there are multiple interpretations of the same events. This is typical of Complex situations. Consider using a narrative mapping exercise where each person illustrates their version of events.",
        "For moving from Complex to Complicated, you'll need to establish some shared facts. Consider a facilitated session where stakeholders identify what they can agree on, however small.",
        "Looking at the emotional patterns in the timeline, I notice escalation occurs when certain topics emerge. Consider setting communication boundaries around these trigger points."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: 'assistant',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
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
    
    // Simulate AI response
    simulateAIResponse(newMessage);
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
                  <p className="text-sm">{message.content}</p>
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
          />
          <Button type="submit" size="icon">
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
