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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">City Analytics</h1>
        <p className="text-slate-500 mt-2">High-level overview of public infrastructure performance.</p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{total}</div>
            <p className="text-xs text-slate-500 mt-1">All time complaints submitted</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Issues</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{active}</div>
            <p className="text-xs text-slate-500 mt-1">Currently in progress or pending</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Critical Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{critical}</div>
            <p className="text-xs text-slate-500 mt-1">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Resolution Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{resolutionRate}%</div>
            <p className="text-xs text-slate-500 mt-1">Issues successfully closed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Category Breakdown */}
        <Card className="col-span-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Reports by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            {categoryCounts.map((cat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">
                    {cat.name.replace('_', ' ')}
                  </span>
                  <span className="text-slate-500">{cat.count} reports</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 dark:bg-blue-600 rounded-full" 
                    style={{ width: `${total > 0 ? (cat.count / total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity Mini-Feed */}
        <Card className="col-span-3 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 mt-2">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center mr-4">
                  <div className="h-2.5 w-2.5 bg-emerald-600 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Database Online</p>
                  <p className="text-xs text-slate-500">Connected to Supabase Region (US-East)</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center mr-4">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Citizen Engagement</p>
                  <p className="text-xs text-slate-500">Traffic normal. No ongoing outages.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
               <p className="text-sm text-slate-500 text-center italic">
                 "Advanced timeline graphs and ML predictive heatmaps are available in the enterprise SLA upgrade."
               </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
