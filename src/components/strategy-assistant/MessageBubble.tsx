
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Message } from './types';
import { AIResponseFormatter } from './AIResponseFormatter';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUserMessage = message.sender === 'user';

  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isUserMessage ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
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
        
        {isUserMessage ? (
          <div className="p-3 rounded-lg bg-primary text-primary-foreground ml-3">
            <p className="text-sm whitespace-pre-line">{message.content}</p>
            <p className="text-xs opacity-70 mt-1 text-right">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        ) : (
          <AIResponseFormatter 
            content={message.content} 
            timestamp={message.timestamp} 
            formattedContent={message.formattedContent} 
          />
        )}
      </div>
    </div>
  );
};
