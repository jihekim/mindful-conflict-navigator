
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export interface CaseCardProps {
  id: string;
  title: string;
  stakeholders: string[];
  status: 'New' | 'In Progress' | 'Resolved';
  dateCreated: string;
  reportsCount: number;
  index?: number;
}

const CaseCard: React.FC<CaseCardProps> = ({
  id,
  title,
  stakeholders,
  status,
  dateCreated,
  reportsCount,
  index = 0
}) => {
  const navigate = useNavigate();
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'New':
        return 'status-new';
      case 'In Progress':
        return 'status-in-progress';
      case 'Resolved':
        return 'status-resolved';
      default:
        return 'status-new';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass-card rounded-xl overflow-hidden"
      onClick={() => navigate(`/case/${id}`)}
    >
      <div className="p-6 cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className={`status-badge ${getStatusClass(status)}`}>
            {status}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Users className="w-4 h-4 mr-2" />
          <span>{stakeholders.join(', ')}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{dateCreated}</span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Reports</span>
          <span className="font-medium">{reportsCount}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseCard;
