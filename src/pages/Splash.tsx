import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Users, User, UserPlus, School, BadgeAlert } from 'lucide-react';
import { useAuth, predefinedUsers, UserRole } from '@/contexts/AuthContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
const Splash = () => {
  const navigate = useNavigate();
  const {
    setCurrentUser
  } = useAuth();
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const handleCounselorLogin = () => {
    const counselor = predefinedUsers.find(user => user.role === 'counselor');
    if (counselor) {
      setCurrentUser(counselor);
      navigate('/counselor');
      toast.success('Logged in as Counselor');
    }
  };
  const handleStakeholderRoleSelect = () => {
    setShowRoleSelector(true);
  };
  const handleStakeholderLogin = () => {
    // Find a user with the selected role or default to student
    const stakeholder = predefinedUsers.find(user => user.role === selectedRole) || predefinedUsers.find(user => user.role === 'student');
    if (stakeholder) {
      setCurrentUser(stakeholder);
      navigate('/stakeholder/chat');
      toast.success(`Logged in as ${stakeholder.role}`);
    }
  };
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-[#5fb455]/10 p-4">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="max-w-md w-full mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">BridgePath</h1>
        <p className="text-xl text-muted-foreground">Transformative Conflict Resolution</p>
        <p className="mt-4 text-muted-foreground">BridgePath offers a structured and empathetic environment for resolving conflicts. Whether you're a school counselor, a parent, or a teacher, our platform is designed to facilitate clearer communication and deeper understanding among all parties involved.</p>
      </motion.div>

      {!showRoleSelector ? <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.2
    }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
          <div className="bg-card rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#5fb455]/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-[#5fb455]" />
            </div>
            <h2 className="text-xl font-bold mb-2">Counselor Dashboard</h2>
            <p className="text-muted-foreground mb-6">Tailored for Conflict Resolution Professionals</p>
            <Button onClick={handleCounselorLogin} className="w-full bg-[#5fb455] hover:bg-[#4ea344]">
              Enter as Counselor
            </Button>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#5fb455]/10 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-[#5fb455]" />
            </div>
            <h2 className="text-xl font-bold mb-2">Community Dashboard</h2>
            <p className="text-muted-foreground mb-6">For Students, Parents, Teachers, and Community Members</p>
            <Button onClick={handleStakeholderRoleSelect} className="w-full bg-[#5fb455] hover:bg-[#4ea344]">Enter as Community Member</Button>
          </div>
        </motion.div> : <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.3
    }} className="bg-card rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Select Your Role</h2>
            <p className="text-muted-foreground">Choose which perspective you're representing</p>
          </div>
          
          <RadioGroup value={selectedRole} onValueChange={value => setSelectedRole(value as UserRole)} className="space-y-3">
            <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student" className="flex items-center cursor-pointer flex-1">
                <User className="h-4 w-4 mr-2 text-[#5fb455]" />
                <span>Student</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
              <RadioGroupItem value="parent" id="parent" />
              <Label htmlFor="parent" className="flex items-center cursor-pointer flex-1">
                <UserPlus className="h-4 w-4 mr-2 text-[#5fb455]" />
                <span>Parent or Guardian</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
              <RadioGroupItem value="teacher" id="teacher" />
              <Label htmlFor="teacher" className="flex items-center cursor-pointer flex-1">
                <School className="h-4 w-4 mr-2 text-[#5fb455]" />
                <span>Teacher</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
              <RadioGroupItem value="police" id="police" />
              <Label htmlFor="police" className="flex items-center cursor-pointer flex-1">
                <BadgeAlert className="h-4 w-4 mr-2 text-[#5fb455]" />
                <span>Police Officer</span>
              </Label>
            </div>
          </RadioGroup>
          
          <div className="mt-6 space-y-2">
            <Button onClick={handleStakeholderLogin} className="w-full bg-[#5fb455] hover:bg-[#4ea344]">
              Continue
            </Button>
            <Button variant="outline" onClick={() => setShowRoleSelector(false)} className="w-full">
              Go Back
            </Button>
          </div>
        </motion.div>}

      <motion.p initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.5,
      delay: 0.4
    }} className="mt-10 text-sm text-muted-foreground">
        Once inside, you can easily switch between accounts using the profile dropdown
      </motion.p>
    </div>;
};
export default Splash;