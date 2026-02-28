import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  // Fetch real counts from Supabase
  const { count: totalCount } = await supabase
    .from('complaints')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const { count: openCount } = await supabase
    .from('complaints')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .neq('status', 'RESOLVED')
    .neq('status', 'CLOSED');

  const { count: resolvedCount } = await supabase
    .from('complaints')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'RESOLVED');

  const { data: recentComplaints } = await supabase
    .from('complaints')
    .select('id, title, status, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3);

  const stats = {
    total: totalCount || 0,
    open: openCount || 0,
    resolved: resolvedCount || 0,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white uppercase">System Overview</h1>
          <p className="text-slate-500 mt-1 text-sm">Real-time metrics for civic engagement.</p>
        </div>
        <Button asChild className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-sm rounded-none h-10 px-6 font-semibold">
          <Link href="/dashboard/complaints/new">
            <PlusCircle className="mr-2 h-4 w-4" /> New Incident Report
          </Link>
        </Button>
      </div>

      <div className="grid gap-0 md:grid-cols-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Incidents Logged</h3>
            <FileText className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-4xl font-mono text-slate-900 dark:text-white font-bold tracking-tighter">{stats.total}</div>
        </div>
        <div className="p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between bg-white dark:bg-slate-950">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Resolution</h3>
            <Clock className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-4xl font-mono text-slate-900 dark:text-white font-bold tracking-tighter">{stats.open}</div>
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sla Satisfied</h3>
            <CheckCircle className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-4xl font-mono text-slate-900 dark:text-white font-bold tracking-tighter">{stats.resolved}</div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-sm font-semibold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Recent Activity Log</h2>
        {recentComplaints && recentComplaints.length > 0 ? (
          <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-sm file:overflow-hidden">
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {recentComplaints.map(comp => (
               <Link href={`/dashboard/complaints/${comp.id}`} key={comp.id} className="block hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="flex items-center space-x-4">
                     <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase">
                      {comp.id.split('-')[0].substring(0, 5)}
                     </span>
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{comp.title}</h3>
                  </div>
                  <div className="flex items-center space-x-4 justify-between sm:justify-end">
                    <p className="text-xs font-mono text-slate-500">{new Date(comp.created_at).toLocaleDateString()}</p>
                    <span className="text-[10px] font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-widest min-w-[100px] text-center">
                      {comp.status}
                    </span>
                  </div>
                </div>
               </Link>
            ))}
            </div>
          </div>
        ) : (
          <div className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-8 text-center rounded-sm">
            <FileText className="h-8 w-8 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1 uppercase tracking-wide">No Telemetry Data</h3>
            <p className="text-xs text-slate-500 mb-6">Awaiting initial grievance submission.</p>
            <Button asChild variant="outline" className="rounded-sm h-8 text-xs font-semibold">
              <Link href="/dashboard/complaints/new">Initialize Report</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
