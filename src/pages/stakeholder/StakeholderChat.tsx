
import React, { useState, useRef, useEffect } from 'react';
import { Send, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import StakeholderLayout from '@/components/StakeholderLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

// Helper function to get chat persona details based on user role
const getChatPersona = (role: string | undefined) => {
  switch (role) {
    case 'parent':
      return {
        title: "Parent Partner",
        introMessage: "Hi! I'm Pat, your Parent Partner. As a parent of two teenagers myself, I understand the ups and downs of navigating school issues and family dynamics. Let's work together to find the best way to support your child's needs.",
        avatarInitial: "P"
      };
    case 'teacher':
      return {
        title: "Educator Ally",
        introMessage: "Hello! I'm Jamie, your Educator Ally. With over a decade of teaching experience and having worked in several diverse classroom settings, I'm here to share insights and support you in your teaching journey.",
        avatarInitial: "J"
      };
    case 'student':
    default:
      return {
        title: "Peer Connect",
        introMessage: "Hey there! I'm Alex from Peer Connect. I'm a college student, and I've been through a lot of the stuff you're facing now—friendships, school pressure, you name it. Feel free to share; I'm here to listen and help.",
        avatarInitial: "A"
      };
  }
};

const StakeholderChat = () => {
  const { currentUser } = useAuth();
  const chatPersona = getChatPersona(currentUser?.role);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: chatPersona.introMessage,
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
      const role = currentUser?.role;
      
      // Different responses based on user role
      let aiResponses: string[] = [];
      
      if (role === 'student') {
        aiResponses = [
          "That sounds really difficult. Can you tell me more about how that made you feel when it happened?",
          "I understand this is hard to talk about. What would you like to see happen as a result of sharing this?",
          "Thank you for sharing that. Would it help to explore what triggered these events?",
          "I hear that you're feeling frustrated. What would help you feel better about this situation?",
          "It's brave of you to share this. What support do you need right now?"
        ];
      } else if (role === 'parent') {
        aiResponses = [
          "As a parent myself, I understand your concern. How has this situation affected your child at home?",
          "From your perspective as a parent, what would a good resolution look like?",
          "What additional context about your family dynamics might help in understanding the situation?",
          "How has this situation impacted your relationship with your child?",
          "What steps have you already taken to address this issue at home?"
        ];
      } else if (role === 'teacher') {
        aiResponses = [
          "From your professional experience, how has this affected the classroom environment?",
          "What classroom management strategies have you tried so far?",
          "How are the other students reacting to this situation?",
          "As an educator, what resources do you think would help address this?",
          "What type of administrative support would be beneficial in this case?"
        ];
      } else {
        aiResponses = [
          "Thank you for sharing your perspective. Can you provide any additional details that might be relevant?",
          "I understand this is a sensitive situation. What would you consider a successful resolution?",
          "From your professional viewpoint, what factors should be considered in addressing this?",
          "How would you recommend proceeding with this situation?",
          "What resources or support do you think would be helpful in this case?"
        ];
      }
      
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
    <StakeholderLayout>
      <Alert className="mb-4 bg-[#5fb455]/10 border-[#5fb455]/20 text-[#4ea344]">
        <ShieldCheck className="h-4 w-4" />
        <AlertDescription>
          This conversation is private and confidential. Nothing you share here will be stored or shared with anyone else.
        </AlertDescription>
      </Alert>
      
      <div className="bg-card rounded-lg shadow-subtle overflow-hidden flex flex-col h-[600px]">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">{chatPersona.title}</h3>
          <p className="text-sm text-muted-foreground">
            Share your experience in a safe, confidential space
          </p>
        </div>
        
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
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
                      <Avatar className="w-8 h-8 bg-[#5fb455] text-primary-foreground">
                        <span className="text-xs">{chatPersona.avatarInitial}</span>
                      </Avatar>
                    ) : (
                      <Avatar className="w-8 h-8 bg-secondary text-secondary-foreground">
                        <span className="text-xs">{currentUser?.name.charAt(0)}</span>
                      </Avatar>
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[#5fb455] text-primary-foreground ml-3'
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
              placeholder="Share your experience..."
              className="flex-1 mr-2"
            />
            <Button type="submit" size="icon" className="bg-[#5fb455] hover:bg-[#4ea344]">
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
    </StakeholderLayout>
  );
};

export default StakeholderChat;
