import { cn } from '@/lib/utils';
import type { IssueStatus } from '@/lib/types';
import { Check, Hourglass, MailQuestion, X } from 'lucide-react';

type StatusStep = {
    name: IssueStatus;
    icon: React.ReactNode;
};

const allStatuses: StatusStep[] = [
  { name: 'Reported', icon: <MailQuestion /> },
  { name: 'In Progress', icon: <Hourglass /> },
  { name: 'Resolved', icon: <Check /> },
];

interface StatusTrackerProps {
  currentStatus: IssueStatus;
}

export default function StatusTracker({ currentStatus }: StatusTrackerProps) {
  const currentIndex = allStatuses.findIndex(s => s.name === currentStatus);

  if (currentStatus === 'Rejected') {
      return (
        <div className="flex items-center p-4 rounded-lg bg-destructive/10 text-destructive-foreground">
            <X className="w-8 h-8 mr-4 text-destructive" />
            <div>
                <h4 className="font-bold">Issue Rejected</h4>
                <p className="text-sm">This report was reviewed and marked as rejected.</p>
            </div>
        </div>
      )
  }

  return (
    <div className="flex items-center w-full">
      {allStatuses.map((status, index) => (
        <div key={status.name} className="flex items-center w-full">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300',
                index <= currentIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              )}
            >
              {status.icon}
            </div>
            <p className={cn(
                'mt-2 text-xs text-center font-medium',
                index <= currentIndex ? 'text-primary' : 'text-muted-foreground'
            )}>{status.name}</p>
          </div>

          {index < allStatuses.length - 1 && (
            <div className="flex-grow h-1 mx-2 rounded-full relative">
                 <div className="absolute top-0 left-0 h-1 w-full bg-muted" />
                 <div 
                    className="absolute top-0 left-0 h-1 bg-primary transition-all duration-500" 
                    style={{ width: index < currentIndex ? '100%' : '0' }}
                />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
