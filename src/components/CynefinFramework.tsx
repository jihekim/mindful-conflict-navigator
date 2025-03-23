
import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export type CynefinDomain = 'Clear' | 'Complicated' | 'Complex' | 'Chaotic';

interface CynefinFrameworkProps {
  currentDomain: CynefinDomain;
  rationale: string;
  onDomainChange: (domain: CynefinDomain, rationale: string) => void;
}

const CynefinFramework: React.FC<CynefinFrameworkProps> = ({
  currentDomain,
  rationale,
  onDomainChange
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedRationale, setEditedRationale] = useState(rationale);
  const [selectedDomain, setSelectedDomain] = useState<CynefinDomain>(currentDomain);

  const handleSaveChanges = () => {
    onDomainChange(selectedDomain, editedRationale);
    setIsEditDialogOpen(false);
  };

  const getDomainDescription = (domain: CynefinDomain): string => {
    switch (domain) {
      case 'Clear':
        return 'Obvious cause and effect relationships. Best practices apply.';
      case 'Complicated':
        return 'Experts needed to analyze cause and effect. Good practices apply.';
      case 'Complex':
        return 'No clear cause-effect relationships. Probing and emergent practices needed.';
      case 'Chaotic':
        return 'Urgent situation with no order. Act to establish stability.';
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-subtle overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-semibold">Cynefin Framework Analysis</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEditedRationale(rationale);
              setSelectedDomain(currentDomain);
              setIsEditDialogOpen(true);
            }}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-1 h-64 mb-6 border rounded-lg overflow-hidden">
          {(['Clear', 'Complicated', 'Complex', 'Chaotic'] as CynefinDomain[]).map((domain) => (
            <div
              key={domain}
              className={`cynefin-quadrant ${
                currentDomain === domain ? 'cynefin-active' : ''
              } flex flex-col items-center justify-center p-4 text-center`}
            >
              <h4 className="font-semibold mb-2">{domain}</h4>
              <p className="text-xs text-muted-foreground">
                {getDomainDescription(domain)}
              </p>
              {currentDomain === domain && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 bg-primary rounded-full mt-3"
                />
              )}
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Current Assessment</h4>
          <div className="bg-accent rounded-lg p-4">
            <p className="text-sm">{rationale}</p>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Cynefin Analysis</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Select Domain</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Clear', 'Complicated', 'Complex', 'Chaotic'] as CynefinDomain[]).map((domain) => (
                  <button
                    key={domain}
                    className={`p-3 border rounded text-center ${
                      selectedDomain === domain
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card hover:bg-accent'
                    }`}
                    onClick={() => setSelectedDomain(domain)}
                  >
                    <div className="font-medium">{domain}</div>
                    <div className="text-xs mt-1">
                      {getDomainDescription(domain)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="rationale" className="text-sm font-medium mb-2 block">
                Assessment Rationale
              </label>
              <Textarea
                id="rationale"
                value={editedRationale}
                onChange={(e) => setEditedRationale(e.target.value)}
                rows={5}
                placeholder="Explain why this case belongs in the selected domain..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CynefinFramework;
