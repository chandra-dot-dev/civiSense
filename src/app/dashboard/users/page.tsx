import { Users, ShieldAlert } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6 text-center py-20">
      <div className="h-20 w-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-400 dark:text-slate-600 mb-6 border border-slate-200 dark:border-slate-800">
        <Users className="h-10 w-10" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">User Management</h1>
      <p className="text-slate-500 mt-2 max-w-md mx-auto">
        Admin dashboard for managing citizens and authority officers. 
      </p>
      
      <div className="max-w-md mx-auto mt-8 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-6 text-left shadow-sm">
        <div className="flex items-start space-x-3 text-blue-800 dark:text-blue-300">
          <ShieldAlert className="h-6 w-6 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-200">Demo Limitation</h3>
            <p className="text-sm mt-1">Full user management (banning users, dynamically assigning roles, etc.) is disabled for the public hackathon demo.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
