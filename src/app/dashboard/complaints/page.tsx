import { CheckCircle2, Clock, MapPin, AlertCircle, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function MyComplaintsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: complaints } = await supabase
    .from('complaints')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  // Map rough IDs to names for UI purposes
  const getCategoryName = (id: string) => {
    switch(id) {
      case 'roads': return 'Roads & Infrastructure';
      case 'water': return 'Water & Sanitation';
      case 'electricity': return 'Electricity & Trees';
      case 'safety': return 'Public Safety';
      default: return 'Others';
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-border pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Incident Logs</h1>
          <p className="text-muted-foreground mt-1 text-sm">Review status and history of submitted reports.</p>
        </div>
        <Button asChild className="h-10 px-6">
          <Link href="/dashboard/complaints/new">Submit Report</Link>
        </Button>
      </div>

      <div className="border border-border bg-card mt-8 rounded-lg shadow-sm overflow-hidden">
        {!complaints || complaints.length === 0 ? (
          <div className="p-8 text-center bg-muted/30">
            <p className="text-sm text-muted-foreground font-medium">No reports found.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {complaints.map((complaint) => (
              <Link 
                key={complaint.id} 
                href={`/dashboard/complaints/${complaint.id}`}
                className="block group hover:bg-muted/50 transition-colors"
              >
                <div className="p-5 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded-md">
                        #{complaint.id.split('-')[0].substring(0, 5)}
                      </span>
                      <span className="text-sm text-muted-foreground">{new Date(complaint.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {complaint.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="inline-flex items-center text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-md">
                        <FileText className="h-3.5 w-3.5 mr-1" /> {getCategoryName(complaint.category_id)}
                      </span>
                      <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-md border
                        ${complaint.urgency === 'CRITICAL' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50' : 
                          complaint.urgency === 'HIGH' ? 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/50' : 
                          'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`
                      }>
                        <AlertCircle className="h-3.5 w-3.5 mr-1" /> {complaint.urgency}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start sm:items-end justify-between border-l sm:border-l-0 border-border sm:pl-0 pl-4">
                    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-md border
                      ${complaint.status === 'RESOLVED' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50' : 
                        complaint.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50' : 
                        'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`
                    }>
                      {complaint.status === 'RESOLVED' ? <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> : <Clock className="h-3.5 w-3.5 mr-1.5" />}
                      {complaint.status.replace('_', ' ')}
                    </span>
                    <div className="mt-4 sm:mt-0 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors flex items-center">
                      View Details &rarr;
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
