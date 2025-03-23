
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Users } from 'lucide-react';
import { useAuth, predefinedUsers } from '@/contexts/AuthContext';

const Splash = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const handleCounselorLogin = () => {
    const counselor = predefinedUsers.find(user => user.role === 'counselor');
    if (counselor) {
      setCurrentUser(counselor);
      navigate('/');
    }
  };

  const handleStakeholderLogin = () => {
    const student = predefinedUsers.find(user => user.role === 'student');
    if (student) {
      setCurrentUser(student);
      navigate('/stakeholder/chat');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto text-center mb-10"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-2">PDR</h1>
        <p className="text-xl text-muted-foreground">Positive Dispute Resolution</p>
        <p className="mt-4 text-muted-foreground">
          A secure and emotionally supportive platform for conflict mediation
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full"
      >
        <div className="bg-card rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">Counselor View</h2>
          <p className="text-muted-foreground mb-6">
            For school counselors managing conflict resolution cases
          </p>
          <Button onClick={handleCounselorLogin} className="w-full">
            Enter as Counselor
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">Stakeholder View</h2>
          <p className="text-muted-foreground mb-6">
            For students, parents, teachers, and other stakeholders
          </p>
          <Button onClick={handleStakeholderLogin} className="w-full">
            Enter as Stakeholder
          </Button>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 text-sm text-muted-foreground"
      >
        Once inside, you can easily switch between accounts using the profile dropdown
      </motion.p>
    </div>
  );
};

export default Splash;
