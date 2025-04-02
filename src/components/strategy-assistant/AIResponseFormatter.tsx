
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FormattedContent } from './types';

interface AIResponseFormatterProps {
  content: string;
  timestamp: string;
  formattedContent?: FormattedContent;
}

export const AIResponseFormatter: React.FC<AIResponseFormatterProps> = ({ 
  content, 
  timestamp, 
  formattedContent 
}) => {
  if (formattedContent && 
     (formattedContent.overview || formattedContent.process)) {
    return (
      <Card className="w-full bg-accent text-accent-foreground">
        {formattedContent.overview && (
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Strategy Overview</CardTitle>
            <CardDescription className="text-accent-foreground/90 text-sm">
              {formattedContent.overview}
            </CardDescription>
          </CardHeader>
        )}
        <CardContent className="space-y-4 pt-0">
          {formattedContent.domain && (
            <div>
              <h4 className="font-medium text-sm mb-1">Cynefin Domain</h4>
              <p className="text-sm text-accent-foreground/90">{formattedContent.domain}</p>
            </div>
          )}
          
          {formattedContent.process && formattedContent.process.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-1">Mediation Process</h4>
              <ol className="list-decimal pl-5 space-y-1">
                {formattedContent.process.map((step, index) => (
                  <li key={index} className="text-sm text-accent-foreground/90">{step}</li>
                ))}
              </ol>
            </div>
          )}
          
          {formattedContent.effects && formattedContent.effects.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-1">Anticipated Effects</h4>
              <ul className="list-disc pl-5 space-y-1">
                {formattedContent.effects.map((effect, index) => (
                  <li key={index} className="text-sm text-accent-foreground/90">{effect}</li>
                ))}
              </ul>
            </div>
          )}
          
          {formattedContent.considerations && formattedContent.considerations.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-1">Key Considerations</h4>
              <ul className="list-disc pl-5 space-y-1">
                {formattedContent.considerations.map((consideration, index) => (
                  <li key={index} className="text-sm text-accent-foreground/90">{consideration}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-xs text-accent-foreground/70 justify-end pt-0">
          {new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <div className="p-3 rounded-lg bg-accent text-accent-foreground mr-3">
      <p className="text-sm whitespace-pre-line">{content}</p>
      <p className="text-xs opacity-70 mt-1 text-right">
        {new Date(timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
  );
};
