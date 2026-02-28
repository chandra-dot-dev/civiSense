import { createClient } from "@/utils/supabase/server";
import { User, ShieldCheck, Mail, Settings as SettingsIcon } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Profile Settings</h1>
        <p className="text-slate-500 mt-2">Manage your account details and preferences.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 mt-8 shadow-sm">
        <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {user?.user_metadata?.full_name || "User"}
            </h2>
            <div className="flex items-center text-slate-500 mt-1">
              <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded uppercase bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {user?.user_metadata?.role || "CITIZEN"} ACCOUNT
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center">
              <Mail className="h-4 w-4 mr-2 text-slate-400" /> Email Address
            </label>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-slate-600 dark:text-slate-400 font-medium">
              {user?.email}
            </div>
            <p className="text-xs text-slate-500">Email addresses cannot be changed during the hackathon demo.</p>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center">
              <ShieldCheck className="h-4 w-4 mr-2 text-slate-400" /> Account Security
            </label>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900 dark:text-white text-sm">Update Password</p>
                <p className="text-xs text-slate-500">Ensure your account uses a strong password.</p>
              </div>
              <button disabled className="text-sm px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-slate-400 cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
          
          <div className="grid gap-2 pt-4">
            <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center">
              <SettingsIcon className="h-4 w-4 mr-2 text-slate-400" /> Notifications
            </label>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md flex justify-between items-center opacity-70">
              <div>
                <p className="font-medium text-slate-900 dark:text-white text-sm">Email Alerts</p>
                <p className="text-xs text-slate-500">Receive updates when your complaint status changes.</p>
              </div>
              <div className="h-5 w-9 bg-blue-600 rounded-full flex items-center px-0.5">
                <div className="h-4 w-4 bg-white rounded-full translate-x-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
