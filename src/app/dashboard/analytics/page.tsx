import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, CheckCircle2, AlertTriangle, Users, Database } from "lucide-react";

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
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">System Analytics</h1>
        <p className="text-muted-foreground mt-1 text-sm">Overview of municipal reporting metrics.</p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">{total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Issues</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">{active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">{critical}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolution Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">{resolutionRate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Category Breakdown */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Incident Typology Spread</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {categoryCounts.map((cat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="capitalize text-slate-700 dark:text-slate-300">
                    {cat.name.replace('_', ' ')}
                  </span>
                  <span className="text-slate-500 text-xs">{cat.count} verified</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" 
                    style={{ width: `${total > 0 ? (cat.count / total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Health / Activity */}
        <Card className="col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle className="text-base font-semibold">System Health</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mr-4 rounded-lg">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-0.5">Database Link</p>
                  <p className="text-xs text-muted-foreground">Status: Nominal (US-East)</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 flex items-center justify-center mr-4 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-0.5">Citizen Access</p>
                  <p className="text-xs text-muted-foreground">Status: Active Traffic</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
               <p className="text-xs text-muted-foreground text-center">
                 Restricted clearance level required for advanced telemetry
               </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
