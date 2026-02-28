import { BarChart3, TrendingUp, Users, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function AnalyticsDashboard() {
  const stats = [
    { label: "Total Complaints", value: "24,592", change: "+12%", icon: BarChart3, color: "blue" },
    { label: "Resolved This Month", value: "3,841", change: "+8%", icon: CheckCircle2, color: "green" },
    { label: "Avg Resolution Time", value: "2.4 Days", change: "-15%", icon: Clock, color: "indigo" },
    { label: "SLA Breaches", value: "142", change: "-3%", icon: AlertTriangle, color: "red" },
  ];

  const categoryData = [
    { name: "Roads & Infrastructure", value: 45 },
    { name: "Water & Sanitation", value: 25 },
    { name: "Electricity & Trees", value: 15 },
    { name: "Public Safety", value: 10 },
    { name: "Others", value: 5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Analytics Overview</h1>
        <p className="text-slate-500 mt-2">Platform performance and resolution metrics.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600 dark:bg-${stat.color}-900/20 dark:text-${stat.color}-400`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            <p className="text-sm text-slate-500 mt-1 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Complaints by Category Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Complaints by Category</h3>
          <div className="space-y-6">
            {categoryData.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="text-slate-500 font-medium">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Clustering Map Placeholder */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Regional Hotspots</h3>
          <div className="flex-1 min-h-[250px] bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=11&size=600x300&maptype=roadmap')] bg-cover bg-center"></div>
            {/* Fake Heatmap blurs */}
            <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-red-500 rounded-full blur-xl opacity-60 mix-blend-multiply dark:mix-blend-screen"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-orange-500 rounded-full blur-xl opacity-60 mix-blend-multiply dark:mix-blend-screen"></div>
            <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-red-600 rounded-full blur-2xl opacity-50 mix-blend-multiply dark:mix-blend-screen"></div>
            
            <div className="relative z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm text-center">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">Map View</span>
              <p className="text-xs text-slate-500">Live Heatmap Data</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
