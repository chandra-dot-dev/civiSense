import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AssignedComplaintsPage() {
  const supabase = await createClient();
  
  // Logic: Real officers would fetch by `assigned_to`
  // But for demo, fetch ALL complaints not yet resolved/closed, sorted by priority
  const { data: complaints } = await supabase
    .from('complaints')
    .select('*')
    .in('status', ['SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS'])
    .order('priority_score', { ascending: false });

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
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white uppercase">Active Queue</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage and resolve high-priority public complaints.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex rounded-sm h-10 border-slate-300 dark:border-slate-700">
            <ArrowUpDown className="mr-2 h-4 w-4" /> Priority Sorted
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm mt-8 hidden md:block">
        <table className="w-full text-left align-middle text-sm">
          <thead className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-5 py-3 font-semibold">Incident Ref & Descriptor</th>
              <th className="px-5 py-3 font-semibold">Priority Index</th>
              <th className="px-5 py-3 font-semibold">Current State</th>
              <th className="px-5 py-3 font-semibold">Ingestion Date</th>
              <th className="px-5 py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {!complaints?.length ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-xs text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-900/50">
                  Queue is currently empty.
                </td>
              </tr>
            ) : complaints.map((comp) => (
              <tr key={comp.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-900 dark:text-white truncate max-w-[280px] uppercase text-xs tracking-wide">{comp.title}</div>
                  <div className="text-slate-500 mt-1.5 flex items-center space-x-2">
                    <span className="font-mono text-[10px] text-slate-600 dark:text-slate-300 font-semibold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-sm border border-slate-200 dark:border-slate-700 tracking-wider">#{comp.id.split('-')[0].substring(0, 5)}</span>
                    <span className="text-[10px] opacity-50">•</span>
                    <span className="text-[10px] uppercase tracking-wider">{getCategoryName(comp.category_id)}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                   <div className="flex items-center space-x-3">
                    <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-800 rounded-sm overflow-hidden border border-slate-300 dark:border-slate-700/50">
                      <div 
                        className={`h-full ${comp.priority_score > 8 ? 'bg-red-600' : comp.priority_score > 5 ? 'bg-orange-600' : 'bg-blue-600'}`} 
                        style={{ width: `${(comp.priority_score / 15) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-slate-700 dark:text-slate-300">{comp.priority_score} / 15</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-sm border uppercase tracking-widest
                    ${comp.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50' : 
                      'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`
                  }>
                    {comp.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-400 whitespace-nowrap font-mono text-xs">
                  {new Date(comp.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-right">
                  <Button asChild variant="outline" size="sm" className="rounded-sm h-8 text-xs font-semibold">
                    <Link href={`/dashboard/assigned/${comp.id}`}>Review</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="grid gap-4 md:hidden mt-8">
        {complaints?.map((comp) => (
          <div key={comp.id} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm p-5">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-sm border border-slate-200 dark:border-slate-700 tracking-wider">#{comp.id.split('-')[0].substring(0, 5)}</span>
              <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-widest
                ${comp.priority_score > 8 ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50' : 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`}>
                PRI {comp.priority_score}/15
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm uppercase mb-4">{comp.title}</h3>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-widest">{comp.status.replace('_', ' ')}</span>
              <Button asChild size="sm" variant="outline" className="h-8 rounded-sm text-xs">
                <Link href={`/dashboard/assigned/${comp.id}`}>Manage</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
