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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">My Complaints</h1>
          <p className="text-slate-500 mt-2">Track the status of your reported issues.</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
          <Link href="/dashboard/complaints/new">File New Complaint</Link>
        </Button>
      </div>

      <div className="grid gap-4 mt-8">
        {!complaints || complaints.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500">No complaints found. You haven't reported anything yet.</p>
          </div>
        ) : complaints.map((complaint) => (
          <Link 
            key={complaint.id} 
            href={`/dashboard/complaints/${complaint.id}`}
            className="block group"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-blue-400 dark:hover:border-blue-700 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase max-w-[120px] truncate">
                      TKN-{complaint.id.split('-')[0].toUpperCase()}
                    </span>
                    <span className="text-xs font-medium text-slate-500">•</span>
                    <span className="text-xs font-medium text-slate-500">{new Date(complaint.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {complaint.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="inline-flex items-center text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">
                      <FileText className="h-3 w-3 mr-1.5 opacity-70" /> {getCategoryName(complaint.category_id)}
                    </span>
                    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full
                      ${complaint.urgency === 'CRITICAL' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                        complaint.urgency === 'HIGH' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`
                    }>
                      <AlertCircle className="h-3 w-3 mr-1.5 opacity-70" /> {complaint.urgency} Priority
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-start sm:items-end justify-between">
                  <span className={`inline-flex items-center text-sm font-semibold px-3 py-1 rounded-full border
                    ${complaint.status === 'RESOLVED' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50' : 
                      complaint.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50' : 
                      'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`
                  }>
                    {complaint.status === 'RESOLVED' ? <CheckCircle2 className="h-4 w-4 mr-1.5" /> : <Clock className="h-4 w-4 mr-1.5" />}
                    {complaint.status.replace('_', ' ')}
                  </span>
                  <div className="mt-4 sm:mt-0 text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:underline flex items-center">
                    View full timeline &rarr;
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
