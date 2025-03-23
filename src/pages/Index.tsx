
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import CaseCard, { CaseCardProps } from '@/components/CaseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data
const mockCases: CaseCardProps[] = [
  {
    id: '1',
    title: 'Classroom Dispute: 9A',
    stakeholders: ['Student A', 'Student B', 'Teacher Jones'],
    status: 'New',
    dateCreated: '2023-06-10',
    reportsCount: 3
  },
  {
    id: '2',
    title: 'Lunchroom Incident',
    stakeholders: ['Student C', 'Cafeteria Staff', 'Student D'],
    status: 'In Progress',
    dateCreated: '2023-06-08',
    reportsCount: 2
  },
  {
    id: '3',
    title: 'Club Membership Dispute',
    stakeholders: ['Student E', 'Club President', 'Faculty Advisor'],
    status: 'In Progress',
    dateCreated: '2023-06-05',
    reportsCount: 4
  },
  {
    id: '4',
    title: 'Online Group Chat Exclusion',
    stakeholders: ['Student F', 'Student G', 'Student H'],
    status: 'Resolved',
    dateCreated: '2023-05-28',
    reportsCount: 2
  },
  {
    id: '5',
    title: 'Sports Team Selection Complaint',
    stakeholders: ['Student I', 'Coach Smith', 'Student J'],
    status: 'New',
    dateCreated: '2023-06-09',
    reportsCount: 1
  },
  {
    id: '6',
    title: 'Classroom Disruption',
    stakeholders: ['Student K', 'Teacher Williams'],
    status: 'Resolved',
    dateCreated: '2023-05-15',
    reportsCount: 3
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const filteredCases = mockCases.filter((caseItem) => {
    // Filter by search query
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.stakeholders.some(stakeholder => 
        stakeholder.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    // Filter by status
    const matchesStatus = 
      statusFilter === 'all' || 
      caseItem.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Case Overview</h1>
          <p className="text-muted-foreground">
            View and manage conflict mediation cases
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-1 max-w-md">
            <Input
              placeholder="Search cases by title or stakeholder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mr-2"
            />
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cases</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create New Case
          </Button>
        </div>
        
        <AnimatePresence>
          {filteredCases.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCases.map((caseItem, index) => (
                <CaseCard key={caseItem.id} {...caseItem} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-medium mb-2">No Cases Found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any cases matching your search criteria. Try adjusting your filters or create a new case.
              </p>
              <Button className="mt-6">
                <Plus className="w-4 h-4 mr-2" />
                Create New Case
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Index;
