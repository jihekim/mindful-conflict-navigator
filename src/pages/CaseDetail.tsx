import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Timeline, { TimelineEvent } from '@/components/Timeline';
import CynefinFramework, { CynefinDomain } from '@/components/CynefinFramework';
import StrategyAssistant from '@/components/StrategyAssistant';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
type CaseDetailType = {
  id: string;
  title: string;
  stakeholders: string[];
  status: 'New' | 'In Progress' | 'Resolved';
  dateCreated: string;
  timeline: TimelineEvent[];
  cynefinDomain: CynefinDomain;
  cynefinRationale: string;
};
const mockCaseDetails: {
  [key: string]: CaseDetailType;
} = {
  '1': {
    id: '1',
    title: 'Classroom Dispute: 9A',
    stakeholders: ['Student A', 'Student B', 'Teacher Jones'],
    status: 'New',
    dateCreated: '2023-06-10',
    timeline: [{
      id: '1-1',
      title: 'Initial Verbal Exchange',
      description: 'Student A made a comment about Student B\'s presentation that B found hurtful.',
      date: '2023-06-08',
      tag: 'Trigger',
      stakeholder: 'Student A'
    }, {
      id: '1-2',
      title: 'Physical Altercation',
      description: 'Student B pushed Student A after class while leaving the room.',
      date: '2023-06-08',
      tag: 'Escalation',
      stakeholder: 'Student B'
    }, {
      id: '1-3',
      title: 'Teacher Intervention',
      description: 'Teacher Jones separated students but didn\'t address underlying issue.',
      date: '2023-06-08',
      stakeholder: 'Teacher Jones'
    }, {
      id: '1-4',
      title: 'Continued Tension',
      description: 'Students refused to work together on group project.',
      date: '2023-06-09',
      tag: 'Escalation'
    }],
    cynefinDomain: 'Complex',
    cynefinRationale: 'This conflict is currently in the Complex domain due to conflicting emotional narratives and unclear intentions from both sides. The situation involves multiple perspectives and emotional factors that are difficult to fully understand. Standard disciplinary approaches may not address the underlying relationship issues.'
  },
  '2': {
    id: '2',
    title: 'Lunchroom Incident',
    stakeholders: ['Student C', 'Cafeteria Staff', 'Student D'],
    status: 'In Progress',
    dateCreated: '2023-06-08',
    timeline: [{
      id: '2-1',
      title: 'Lunch Line Disagreement',
      description: 'Student C accused Student D of cutting the lunch line.',
      date: '2023-06-07',
      tag: 'Trigger',
      stakeholder: 'Student C'
    }, {
      id: '2-2',
      title: 'Food Throwing Incident',
      description: 'Student D allegedly threw food toward Student C\'s table.',
      date: '2023-06-07',
      tag: 'Escalation',
      stakeholder: 'Student D'
    }, {
      id: '2-3',
      title: 'Staff Intervention',
      description: 'Cafeteria staff reported both students to administration.',
      date: '2023-06-07',
      stakeholder: 'Cafeteria Staff'
    }],
    cynefinDomain: 'Complicated',
    cynefinRationale: 'This conflict appears to be in the Complicated domain because while there is a clear sequence of events, understanding the social dynamics and group loyalties requires expert analysis. There are established protocols for lunchroom behavior but we need a deeper understanding of the social context.'
  }
};
const CaseDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [caseDetails, setCaseDetails] = useState<CaseDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      if (id && mockCaseDetails[id]) {
        setCaseDetails(mockCaseDetails[id]);
      }
      setLoading(false);
    }, 500);
  }, [id]);
  if (loading) {
    return <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse text-center">
            <div className="h-8 w-64 bg-muted rounded mb-4 mx-auto"></div>
            <div className="h-4 w-48 bg-muted rounded mx-auto"></div>
          </div>
        </div>
      </Layout>;
  }
  if (!caseDetails) {
    return <Layout>
        <div className="p-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cases
          </Button>
          
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Case Not Found</h3>
            <p className="text-muted-foreground max-w-md">
              We couldn't find the case you're looking for. It may have been removed or you may have followed an invalid link.
            </p>
            <Button className="mt-6" onClick={() => navigate('/')}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </Layout>;
  }
  const handleTimelineUpdate = (updatedEvents: TimelineEvent[]) => {
    setCaseDetails({
      ...caseDetails,
      timeline: updatedEvents
    });
    toast.success("Timeline updated successfully");
  };
  const handleCynefinUpdate = (domain: CynefinDomain, rationale: string) => {
    setCaseDetails({
      ...caseDetails,
      cynefinDomain: domain,
      cynefinRationale: rationale
    });
    toast.success("Cynefin framework assessment updated");
  };
  const exportStrategy = () => {
    const content = `
# Conflict Case Strategy: ${caseDetails.title}
Date: ${new Date().toLocaleDateString()}

## Case Details
- Status: ${caseDetails.status}
- Created: ${caseDetails.dateCreated}
- Stakeholders: ${caseDetails.stakeholders.join(', ')}

## Timeline of Events
${caseDetails.timeline.map(event => `
- ${event.date}: ${event.title}
  ${event.description}
  ${event.tag ? `Tag: ${event.tag}` : ''}
  ${event.stakeholder ? `Stakeholder: ${event.stakeholder}` : ''}
`).join('')}

## Cynefin Framework Assessment
Domain: ${caseDetails.cynefinDomain}

Rationale:
${caseDetails.cynefinRationale}

## Strategic Recommendations
1. [Add counselor recommendations here]
2. [Add counselor recommendations here]
3. [Add counselor recommendations here]
`;
    const blob = new Blob([content], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${caseDetails.title.replace(/\s+/g, '-').toLowerCase()}-strategy.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Strategy document exported successfully");
  };
  return <Layout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {caseDetails.title}
              </h1>
              <div className="flex items-center mt-1">
                <span className={`status-badge ${caseDetails.status === 'New' ? 'status-new' : caseDetails.status === 'In Progress' ? 'status-in-progress' : 'status-resolved'}`}>
                  {caseDetails.status}
                </span>
                <span className="text-sm text-muted-foreground ml-3">
                  Created on {new Date(caseDetails.dateCreated).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportStrategy}>
              <Download className="w-4 h-4 mr-2" />
              Export Strategy
            </Button>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Stakeholder
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">Stakeholders</h2>
          <div className="flex flex-wrap gap-2">
            {caseDetails.stakeholders.map((stakeholder, index) => <div key={index} className="px-3 py-1.5 bg-accent rounded-full text-sm font-medium">
                {stakeholder}
              </div>)}
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="assistant">Strategy Creator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.3
            }}>
                <Timeline events={caseDetails.timeline} onUpdateEvents={handleTimelineUpdate} />
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.3,
              delay: 0.1
            }}>
                <CynefinFramework currentDomain={caseDetails.cynefinDomain} rationale={caseDetails.cynefinRationale} onDomainChange={handleCynefinUpdate} />
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <Timeline events={caseDetails.timeline} onUpdateEvents={handleTimelineUpdate} />
            </div>
          </TabsContent>
          
          <TabsContent value="assistant" className="animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <StrategyAssistant caseId={caseDetails.id} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>;
};
export default CaseDetail;