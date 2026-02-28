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
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</h1>
        <p className="text-slate-500 mt-2">Here is an overview of your civic engagements.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Total Complaints</h3>
            <FileText className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Active Issues</h3>
            <Clock className="h-5 w-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{stats.open}</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Resolved</h3>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{stats.resolved}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Notice something broken?</h3>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Submit a new complaint to get it fixed.</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
          <Link href="/dashboard/complaints/new">
            <PlusCircle className="mr-2 h-4 w-4" /> New Complaint
          </Link>
        </Button>
      </div>
      
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Recent Activity</h2>
        {recentComplaints && recentComplaints.length > 0 ? (
          <div className="grid gap-4">
            {recentComplaints.map(comp => (
               <Link href={`/dashboard/complaints/${comp.id}`} key={comp.id} className="block hover:opacity-80 transition-opacity">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{comp.title}</h3>
                    <p className="text-sm text-slate-500">{new Date(comp.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {comp.status}
                  </span>
                </div>
               </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-8 text-center">
            <FileText className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No recent activity</h3>
            <p className="text-slate-500 mb-6">You haven't submitted any complaints recently.</p>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/dashboard/complaints/new">Submit a complaint</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
