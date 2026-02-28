import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, CheckCircle2, AlertTriangle, Users } from "lucide-react";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  // 1. Fetch all complaints for high-level stats
  const { data: complaints } = await supabase.from('complaints').select('status, priority_score, created_at, category_id');
  
  // 2. Compute Stats
  const total = complaints?.length || 0;
  const resolved = complaints?.filter(c => c.status === 'RESOLVED' || c.status === 'CLOSED').length || 0;
  const active = total - resolved;
  const critical = complaints?.filter(c => (c.priority_score || 0) >= 10 && c.status !== 'RESOLVED' && c.status !== 'CLOSED').length || 0;
  
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  // 3. Category Breakdown
  const categories = ['roads', 'water', 'electricity', 'safety', 'others'];
  const categoryCounts = categories.map(cat => ({
    name: cat,
    count: complaints?.filter(c => c.category_id === cat).length || 0
  })).sort((a,b) => b.count - a.count);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white uppercase">System Analytics</h1>
        <p className="text-slate-500 mt-1 text-sm">Aggregate municipal infrastructure telemetry.</p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-sm">
        <div className="p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Total Reports</h3>
            <BarChart3 className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-3xl font-mono text-slate-900 dark:text-white font-bold tracking-tighter">{total}</div>
        </div>

        <div className="p-6 border-b md:border-b-0 md:border-r lg:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Active Issues</h3>
            <Clock className="h-4 w-4 text-orange-600" />
          </div>
          <div className="text-3xl font-mono text-slate-900 dark:text-white font-bold tracking-tighter">{active}</div>
        </div>

        <div className="p-6 border-b lg:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Critical Priority</h3>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </div>
          <div className="text-3xl font-mono text-slate-900 dark:text-white font-bold tracking-tighter">{critical}</div>
        </div>

        <div className="p-6 flex flex-col justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Resolution Rate</h3>
            <CheckCircle2 className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-3xl font-mono text-slate-900 dark:text-white font-bold tracking-tighter">{resolutionRate}%</div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 pt-4">
        
        {/* Category Breakdown */}
        <div className="col-span-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-900 dark:text-white">Incident Typology Spread</h3>
          </div>
          <div className="space-y-6 pt-6 p-5">
            {categoryCounts.map((cat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {cat.name.replace('_', ' ')}
                  </span>
                  <span className="text-slate-500">{cat.count} VERIFIED</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-sm overflow-hidden border border-slate-200 dark:border-slate-700/50">
                  <div 
                    className="h-full bg-slate-600 dark:bg-slate-400 rounded-sm" 
                    style={{ width: `${total > 0 ? (cat.count / total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Mini-Feed */}
        <div className="col-span-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-900 dark:text-white">Node Health</h3>
          </div>
          <div className="p-5">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-slate-100 dark:bg-slate-900 text-slate-600 flex items-center justify-center mr-4 border border-slate-200 dark:border-slate-800 rounded-sm">
                  <div className="h-2 w-2 bg-slate-600 rounded-sm animate-pulse"></div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-0.5">Database Link</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Status: NOMINAL (US-EAST)</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-slate-100 dark:bg-slate-900 text-slate-600 flex items-center justify-center mr-4 border border-slate-200 dark:border-slate-800 rounded-sm">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-0.5">Citizen Access</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Status: ACTIVE TRAFFIC</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
               <p className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-mono">
                 RESTRICTED CLEARANCE LEVEL REQUIRED FOR ADVANCED TELEMETRY
               </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
