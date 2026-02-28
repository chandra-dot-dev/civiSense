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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Active Queue</h1>
          <p className="text-slate-500 mt-2">Manage and resolve high-priority public complaints.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <ArrowUpDown className="mr-2 h-4 w-4" /> Priority Sorted
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl mt-8 shadow-sm hidden md:block">
        <table className="w-full text-sm text-left align-middle">
          <thead className="text-xs text-slate-600 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold">ID & Title</th>
              <th className="px-6 py-4 font-semibold">Priority Score</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {!complaints?.length ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No active complaints in the queue.
                </td>
              </tr>
            ) : complaints.map((comp) => (
              <tr key={comp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900 dark:text-white truncate max-w-[250px]">{comp.title}</div>
                  <div className="text-slate-500 mt-1 flex items-center space-x-2">
                    <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-800 max-w-[90px] truncate">{comp.id.split('-')[0].substring(0, 5).toUpperCase()}</span>
                    <span className="text-[10px]">•</span>
                    <span className="text-xs">{getCategoryName(comp.category_id)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center space-x-2">
                    <div className="h-2 w-16 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${comp.priority_score > 8 ? 'bg-red-500' : comp.priority_score > 5 ? 'bg-orange-500' : 'bg-blue-500'}`} 
                        style={{ width: `${(comp.priority_score / 15) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{comp.priority_score} / 15</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border
                    ${comp.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400' : 
                      'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300'}`
                  }>
                    {comp.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                  {new Date(comp.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button asChild variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
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
          <div key={comp.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-800 max-w-[90px] truncate">{comp.id.split('-')[0].substring(0, 5).toUpperCase()}</span>
              <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded uppercase
                ${comp.priority_score > 8 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                PRIORITY {comp.priority_score}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{comp.title}</h3>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500">{comp.status.replace('_', ' ')}</span>
              <Button asChild size="sm" variant="outline" className="h-8">
                <Link href={`/dashboard/assigned/${comp.id}`}>Manage</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
