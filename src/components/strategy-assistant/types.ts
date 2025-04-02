
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  formattedContent?: FormattedContent;
}

export interface FormattedContent {
  overview?: string;
  domain?: string;
  process?: string[];
  effects?: string[];
  considerations?: string[];
  rawContent: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  tag?: string;
  stakeholder?: string;
}

export interface CaseDetails {
  id: string;
  title: string;
  stakeholders: string[];
  status: 'New' | 'In Progress' | 'Resolved';
  dateCreated: string;
  timeline: TimelineEvent[];
  cynefinDomain: 'Clear' | 'Complicated' | 'Complex' | 'Chaotic';
  cynefinRationale: string;
}
