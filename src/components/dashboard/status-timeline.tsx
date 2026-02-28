import { Check, Clock, FileEdit, UserCheck } from "lucide-react";

interface TimelineEvent {
  status: string;
  date: string;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export function StatusTimeline({ events }: { events: TimelineEvent[] }) {
  const getIcon = (status: string) => {
    switch (status) {
      case 'SUBMITTED': return <FileEdit className="h-4 w-4" />;
      case 'UNDER_REVIEW': return <Clock className="h-4 w-4" />;
      case 'ASSIGNED': return <UserCheck className="h-4 w-4" />;
      case 'IN_PROGRESS': return <Clock className="h-4 w-4" />;
      case 'RESOLVED': return <Check className="h-4 w-4" />;
      default: return <Check className="h-4 w-4" />;
    }
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.status}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-4">
                <div>
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-950
                    ${event.isCompleted ? 'bg-green-500 text-white' : 
                      event.isCurrent ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 
                      'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {getIcon(event.status)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className={`text-sm font-semibold ${event.isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                      {event.status.replace('_', ' ')}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {event.description}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-slate-500 dark:text-slate-400">
                    {event.date}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
