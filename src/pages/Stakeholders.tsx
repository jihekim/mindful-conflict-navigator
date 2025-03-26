
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StakeholderList from '@/components/stakeholders/StakeholderList';
import StakeholderDetail from '@/components/stakeholders/StakeholderDetail';
import MediationPrep from '@/components/stakeholders/MediationPrep';

// Mock data - in a real app this would come from an API
const mockStakeholders = [
  {
    id: '1',
    name: 'Student A',
    role: 'Student',
    caseId: '1',
    caseName: 'Classroom Dispute: 9A',
    avatar: null,
    notes: 'Sensitive to criticism about academic performance.',
    triggerPoints: ['Being laughed at', 'Public embarrassment'],
    wishes: ['To be respected by peers', 'To improve academic standing'],
    storyReport: 'Claims that Student B intentionally mocked their presentation to make them look bad in front of the class.'
  },
  {
    id: '2',
    name: 'Student B',
    role: 'Student',
    caseId: '1',
    caseName: 'Classroom Dispute: 9A',
    avatar: null,
    notes: 'Tends to use humor as a defense mechanism.',
    triggerPoints: ['Being accused of malicious intent', 'Authority figures taking sides without hearing their perspective'],
    wishes: ['To be seen as funny, not mean', 'To clear up misunderstandings'],
    storyReport: 'States that their comment was intended as a joke, not to hurt Student A. Feels unfairly labeled as a bully.'
  },
  {
    id: '3',
    name: 'Teacher Jones',
    role: 'Teacher',
    caseId: '1',
    caseName: 'Classroom Dispute: 9A',
    avatar: null,
    notes: 'Concerned about classroom management and maintaining order.',
    triggerPoints: ['Disruptions to learning environment', 'Escalating conflict between students'],
    wishes: ['To resolve the dispute quickly', 'To create a positive learning environment'],
    storyReport: 'Observed increasing tension between Student A and B over the past few weeks. Intervened after the physical altercation but wants a more permanent solution.'
  },
  {
    id: '4',
    name: 'Student C',
    role: 'Student',
    caseId: '2',
    caseName: 'Lunchroom Incident',
    avatar: null,
    notes: 'Has complained about lunch line issues in the past.',
    triggerPoints: ['Perceived unfairness', 'Rule-breaking'],
    wishes: ['Fair enforcement of rules', 'Peaceful lunch period'],
    storyReport: 'Believes Student D deliberately cut in line and then escalated the situation by throwing food.'
  },
  {
    id: '5',
    name: 'Student D',
    role: 'Student',
    caseId: '2',
    caseName: 'Lunchroom Incident',
    avatar: null,
    notes: 'New student, still adjusting to school rules and culture.',
    triggerPoints: ['Feeling excluded', 'Being singled out'],
    wishes: ['To make friends', 'To fit in at new school'],
    storyReport: 'Claims they were joining a friend in line, not cutting. Denies throwing food intentionally.'
  },
  {
    id: '6',
    name: 'Cafeteria Staff',
    role: 'Staff',
    caseId: '2',
    caseName: 'Lunchroom Incident',
    avatar: null,
    notes: 'Responsible for maintaining order in the cafeteria.',
    triggerPoints: ['Disruptive behavior', 'Food waste'],
    wishes: ['Orderly lunch periods', 'Respectful student behavior'],
    storyReport: 'Witnessed argument in line followed by food being thrown. Concerned about pattern of behavior during lunch periods.'
  }
];

const Stakeholders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStakeholder, setSelectedStakeholder] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('list');
  
  const filteredStakeholders = mockStakeholders.filter(
    stakeholder => stakeholder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  stakeholder.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  stakeholder.caseName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectStakeholder = (stakeholder: any) => {
    setSelectedStakeholder(stakeholder);
    setActiveTab('details');
  };
  
  const handleBackToList = () => {
    setActiveTab('list');
    setSelectedStakeholder(null);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Stakeholders</h1>
            <p className="text-muted-foreground mt-1">
              Manage and view detailed information about all case stakeholders
            </p>
          </div>
          <Button onClick={() => navigate('/add-stakeholder')}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Stakeholder
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stakeholders by name, role, or case..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Card>
          <CardHeader className="px-6 py-4 border-b">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList>
                <TabsTrigger value="list">All Stakeholders</TabsTrigger>
                {selectedStakeholder && (
                  <TabsTrigger value="details">{selectedStakeholder.name}</TabsTrigger>
                )}
                {selectedStakeholder && (
                  <TabsTrigger value="mediation">Mediation Prep</TabsTrigger>
                )}
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="px-0 py-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="list" className="m-0">
                <StakeholderList 
                  stakeholders={filteredStakeholders} 
                  onSelectStakeholder={handleSelectStakeholder} 
                />
              </TabsContent>
              
              <TabsContent value="details" className="m-0">
                {selectedStakeholder && (
                  <StakeholderDetail 
                    stakeholder={selectedStakeholder} 
                    onBack={handleBackToList}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="mediation" className="m-0">
                {selectedStakeholder && (
                  <MediationPrep 
                    stakeholder={selectedStakeholder} 
                    onBack={handleBackToList}
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Stakeholders;
