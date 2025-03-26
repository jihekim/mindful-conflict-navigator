
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface StakeholderListProps {
  stakeholders: any[];
  onSelectStakeholder: (stakeholder: any) => void;
}

const StakeholderList: React.FC<StakeholderListProps> = ({ 
  stakeholders, 
  onSelectStakeholder 
}) => {
  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stakeholder</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Case</TableHead>
            <TableHead className="w-24">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stakeholders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No stakeholders found
              </TableCell>
            </TableRow>
          ) : (
            stakeholders.map((stakeholder) => (
              <TableRow key={stakeholder.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {stakeholder.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{stakeholder.name}</span>
                  </div>
                </TableCell>
                <TableCell>{stakeholder.role}</TableCell>
                <TableCell>{stakeholder.caseName}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="whitespace-nowrap"
                    onClick={() => onSelectStakeholder(stakeholder)}
                  >
                    <span className="sr-only">View details for {stakeholder.name}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StakeholderList;
