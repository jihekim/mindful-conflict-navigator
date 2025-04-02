
import { FormattedContent } from './types';

export const formatAIResponse = (content: string): FormattedContent => {
  let formattedContent: FormattedContent = { rawContent: content };
  
  const overviewMatch = content.match(/STRATEGY OVERVIEW:?([\s\S]*?)(?=CYNEFIN DOMAIN:|MEDIATION PROCESS:|ANTICIPATED EFFECTS:|CONSIDERATIONS:|$)/i);
  if (overviewMatch && overviewMatch[1]) {
    formattedContent.overview = overviewMatch[1].trim();
  }
  
  const domainMatch = content.match(/CYNEFIN DOMAIN:?([\s\S]*?)(?=MEDIATION PROCESS:|ANTICIPATED EFFECTS:|CONSIDERATIONS:|$)/i);
  if (domainMatch && domainMatch[1]) {
    formattedContent.domain = domainMatch[1].trim();
  }
  
  const processMatch = content.match(/MEDIATION PROCESS:?([\s\S]*?)(?=ANTICIPATED EFFECTS:|CONSIDERATIONS:|$)/i);
  if (processMatch && processMatch[1]) {
    const processList = processMatch[1].trim().split(/\d+\./).filter(item => item.trim() !== '');
    formattedContent.process = processList.map(item => item.trim());
  }
  
  const effectsMatch = content.match(/ANTICIPATED EFFECTS:?([\s\S]*?)(?=CONSIDERATIONS:|$)/i);
  if (effectsMatch && effectsMatch[1]) {
    const effectsList = effectsMatch[1].trim().split(/\d+\.|\n-/).filter(item => item.trim() !== '');
    formattedContent.effects = effectsList.map(item => item.trim());
  }
  
  const considerationsMatch = content.match(/CONSIDERATIONS:?([\s\S]*?)(?=$)/i);
  if (considerationsMatch && considerationsMatch[1]) {
    const considerationsList = considerationsMatch[1]
      .trim()
      .split(/\n-|\n•/)
      .filter(item => item.trim() !== '')
      .map(item => item.trim());
      
    formattedContent.considerations = considerationsList;
  }
  
  if (!formattedContent.overview && !formattedContent.process) {
    return { rawContent: content };
  }
  
  return formattedContent;
};
