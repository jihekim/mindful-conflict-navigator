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
      stakeholder: 'Student A',
      perspectives: [
        {
          stakeholder: 'Student A',
          perspective: 'I was just trying to give constructive feedback on the presentation. I didn\'t mean to hurt anyone\'s feelings.'
        },
        {
          stakeholder: 'Student B',
          perspective: 'The comment felt like it was meant to mock my work in front of everyone. It was humiliating.'
        },
        {
          stakeholder: 'Teacher Jones',
          perspective: 'I heard the exchange but didn\'t realize the impact it would have. In hindsight, I should have addressed it immediately.'
        }
      ],
      triggerPoints: [
        'Public criticism in front of peers',
        'Perceived tone of mockery',
        'History of academic competition between students'
      ],
      emotionalHistory: [
        {
          stakeholder: 'Student A',
          emotion: 'Defensive',
          intensity: 4,
          notes: 'Became increasingly frustrated when intentions were questioned'
        },
        {
          stakeholder: 'Student B',
          emotion: 'Humiliated',
          intensity: 8,
          notes: 'Felt deeply embarrassed and angry after the incident'
        }
      ]
    }, {
      id: '1-2',
      title: 'Physical Altercation',
      description: 'Student B pushed Student A after class while leaving the room.',
      date: '2023-06-08',
      tag: 'Escalation',
      stakeholder: 'Student B',
      perspectives: [
        {
          stakeholder: 'Student A',
          perspective: 'I was completely shocked when I got pushed. I hadn\'t expected any physical confrontation.'
        },
        {
          stakeholder: 'Student B',
          perspective: 'I was so upset that I acted without thinking. I just wanted them to feel how hurt I was.'
        }
      ],
      triggerPoints: [
        'Accumulated frustration',
        'Perceived lack of consequences for verbal comments',
        'Feeling of powerlessness'
      ],
      emotionalHistory: [
        {
          stakeholder: 'Student A',
          emotion: 'Shocked',
          intensity: 7,
          notes: 'Surprised by the physical response to what they saw as a minor issue'
        },
        {
          stakeholder: 'Student B',
          emotion: 'Angry',
          intensity: 9,
          notes: 'Reached emotional breaking point after holding in feelings'
        }
      ]
    }, {
      id: '1-3',
      title: 'Teacher Intervention',
      description: 'Teacher Jones separated students but didn\'t address underlying issue.',
      date: '2023-06-08',
      stakeholder: 'Teacher Jones',
      perspectives: [
        {
          stakeholder: 'Teacher Jones',
          perspective: 'My priority was to ensure physical safety. I separated the students immediately but didn\'t have time for a proper discussion.'
        }
      ],
      triggerPoints: [
        'Lack of immediate resolution',
        'Feeling that justice wasn\'t served'
      ],
      emotionalHistory: [
        {
          stakeholder: 'Teacher Jones',
          emotion: 'Concerned',
          intensity: 6,
          notes: 'Worried about classroom management and potential escalation'
        }
      ]
    }, {
      id: '1-4',
      title: 'Continued Tension',
      description: 'Students refused to work together on group project.',
      date: '2023-06-09',
      tag: 'Escalation',
      perspectives: [
        {
          stakeholder: 'Student A',
          perspective: 'I tried to be professional but Student B refused to even look at me. It makes group work impossible.'
        },
        {
          stakeholder: 'Student B',
          perspective: 'I don\'t feel safe or comfortable working with someone who disrespected me and hasn\'t apologized.'
        },
        {
          stakeholder: 'Teacher Jones',
          perspective: 'The tension is affecting the entire class atmosphere. Other students are starting to take sides.'
        }
      ],
      triggerPoints: [
        'Forced collaboration without resolution',
        'Social group dynamics and peer pressure',
        'Lack of formal mediation'
      ],
      emotionalHistory: [
        {
          stakeholder: 'Student A',
          emotion: 'Frustrated',
          intensity: 5,
          notes: 'Feels the situation is being blown out of proportion'
        },
        {
          stakeholder: 'Student B',
          emotion: 'Anxious',
          intensity: 7,
          notes: 'Experiencing stress about coming to class and group work'
        },
        {
          stakeholder: 'Teacher Jones',
          emotion: 'Overwhelmed',
          intensity: 6,
          notes: 'Struggling to manage classroom dynamics while teaching curriculum'
        }
      ]
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
      stakeholder: 'Student C',
      perspectives: [
        {
          stakeholder: 'Student C',
          perspective: 'I saw Student D deliberately cut in front of several people. When I called them out, they ignored me completely.'
        },
        {
          stakeholder: 'Student D',
          perspective: 'I was just joining my friend who was already in line. I didn\'t think it was a big deal since we always sit together.'
        }
      ],
      triggerPoints: [
        'Perceived rule-breaking',
        'Public confrontation',
        'New student unfamiliar with social norms'
      ],
      emotionalHistory: [
        {
          stakeholder: 'Student C',
          emotion: 'Indignant',
          intensity: 6,
          notes: 'Felt rules were being broken and that it was unfair to others waiting'
        },
        {
          stakeholder: 'Student D',
          emotion: 'Embarrassed',
          intensity: 5,
          notes: 'Didn\'t expect to be called out and felt singled out as the new student'
        }
      ]
    }, {
      id: '2-2',
      title: 'Food Throwing Incident',
      description: 'Student D allegedly threw food toward Student C\'s table.',
      date: '2023-06-07',
      tag: 'Escalation',
      stakeholder: 'Student D',
      perspectives: [
        {
          stakeholder: 'Student C',
          perspective: 'They deliberately threw food at our table to get back at me for calling them out.'
        },
        {
          stakeholder: 'Student D',
          perspective: 'I accidentally knocked over my tray when I was getting up. I didn\'t throw anything on purpose.'
        },
        {
          stakeholder: 'Cafeteria Staff',
          perspective: 'From my angle, it looked intentional, but there was a lot of commotion in the cafeteria at that time.'
        }
      ],
      triggerPoints: [
        'Public embarrassment',
        'Feeling misunderstood',
        'Peer pressure from new friends'
      ],
      emotionalHistory: [
        {
          stakeholder: 'Student C',
          emotion: 'Angry',
          intensity: 8,
          notes: 'Felt targeted and disrespected'
        },
        {
          stakeholder: 'Student D',
          emotion: 'Frustrated',
          intensity: 7,
          notes: 'Feels unfairly accused and isolated'
        }
      ]
    }, {
      id: '2-3',
      title: 'Staff Intervention',
      description: 'Cafeteria staff reported both students to administration.',
      date: '2023-06-07',
      stakeholder: 'Cafeteria Staff',
      perspectives: [
        {
          stakeholder: 'Cafeteria Staff',
          perspective: 'These incidents have been increasing, and we need a consistent approach to maintain order during lunch periods.'
        },
        {
          stakeholder: 'Student C',
          perspective: 'It\'s not fair that I got in trouble too when I was just standing up for the rules.'
        },
        {
          stakeholder: 'Student D',
          perspective: 'Everyone\'s assuming I did things on purpose when I didn\'t. It\'s making it hard to make friends.'
        }
      ],
      triggerPoints: [
        'Perceived injustice in consequences',
        'Authority involvement without full context',
        'Impact on social standing among peers'
      ],
      emotionalHistory: [
        {
          stakeholder: 'Cafeteria Staff',
          emotion: 'Concerned',
          intensity: 5,
          notes: 'Worried about maintaining order and preventing future incidents'
        },
        {
          stakeholder: 'Student C',
          emotion: 'Resentful',
          intensity: 6,
          notes: 'Feels punished for standing up for what\'s right'
        },
        {
          stakeholder: 'Student D',
          emotion: 'Isolated',
          intensity: 8,
          notes: 'Feeling labeled as a troublemaker when trying to fit in'
        }
      ]
    }],
    cynefinDomain: 'Complicated',
    cynefinRationale: 'This conflict appears to be in the Complicated domain because while there is a clear sequence of events, understanding the social dynamics and group loyalties requires expert analysis. There are established protocols for lunchroom behavior but we need a deeper understanding of the social context.'
  }
};

const CaseDetail = () => {
  const { id } = useParams<{ id: string; }>();
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

  // New function to handle stakeholder tag clicks
  const handleStakeholderClick = (stakeholderName: string) => {
    navigate(`/stakeholders`, { state: { selectedStakeholder: stakeholderName } });
  };
  
  return (
    <Layout>
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
            {caseDetails.stakeholders.map((stakeholder, index) => (
              <div 
                key={index} 
                className="px-3 py-1.5 bg-accent rounded-full text-sm font-medium cursor-pointer hover:bg-accent/80 transition-colors"
                onClick={() => handleStakeholderClick(stakeholder)}
              >
                {stakeholder}
              </div>
            ))}
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
    </Layout>
  );
};

export default CaseDetail;
