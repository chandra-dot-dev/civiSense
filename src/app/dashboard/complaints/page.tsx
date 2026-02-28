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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white uppercase">Incident Logs</h1>
          <p className="text-slate-500 mt-1 text-sm">Review status and audit history of submitted reports.</p>
        </div>
        <Button asChild className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-sm h-10 px-6 font-semibold">
          <Link href="/dashboard/complaints/new">Initialize Report</Link>
        </Button>
      </div>

      <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-8 rounded-sm overflow-hidden">
        {!complaints || complaints.length === 0 ? (
          <div className="p-8 text-center border-b border-slate-200 dark:border-slate-800 last:border-0 bg-slate-50 dark:bg-slate-900/50">
            <p className="text-sm text-slate-500 uppercase tracking-widest">No Incident Logs Found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {complaints.map((complaint) => (
              <Link 
                key={complaint.id} 
                href={`/dashboard/complaints/${complaint.id}`}
                className="block group hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <div className="p-5 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono font-medium text-slate-600 bg-slate-200 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        #{complaint.id.split('-')[0].substring(0, 5)}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{new Date(complaint.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                      {complaint.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="inline-flex items-center text-[10px] uppercase tracking-widest font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-sm border border-slate-200 dark:border-slate-700">
                        <FileText className="h-3 w-3 mr-1 opacity-70" /> {getCategoryName(complaint.category_id)}
                      </span>
                      <span className={`inline-flex items-center text-[10px] uppercase tracking-widest font-semibold px-2 py-1 rounded-sm border
                        ${complaint.urgency === 'CRITICAL' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50' : 
                          complaint.urgency === 'HIGH' ? 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/50' : 
                          'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`
                      }>
                        <AlertCircle className="h-3 w-3 mr-1 opacity-70" /> Lvl {complaint.urgency}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start sm:items-end justify-between border-l sm:border-l-0 border-slate-100 dark:border-slate-800 sm:pl-0 pl-4">
                    <span className={`inline-flex items-center text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-sm border
                      ${complaint.status === 'RESOLVED' ? 'bg-slate-800 text-white border-slate-900 dark:bg-slate-200 dark:text-slate-900 dark:border-white' : 
                        complaint.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50' : 
                        'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`
                    }>
                      {complaint.status === 'RESOLVED' ? <CheckCircle2 className="h-3 w-3 mr-1.5" /> : <Clock className="h-3 w-3 mr-1.5" />}
                      {complaint.status.replace('_', ' ')}
                    </span>
                    <div className="mt-4 sm:mt-0 text-[10px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors flex items-center">
                      Examine Data &rarr;
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
