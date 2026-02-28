import { createClient } from "@/utils/supabase/server";
import { User, ShieldCheck, Mail, Settings as SettingsIcon } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white uppercase">Profile & Settings</h1>
        <p className="text-slate-500 mt-1 text-sm">Manage authentication credentials and system preferences.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm p-6 mt-8">
        <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="h-16 w-16 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-sm flex items-center justify-center text-slate-700 dark:text-slate-300">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
              {user?.user_metadata?.full_name || "Authorized User"}
            </h2>
            <div className="flex items-center text-slate-500 mt-1">
              <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                CLEARANCE: {user?.user_metadata?.role || "CITIZEN"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-2">
            <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center uppercase tracking-wider">
              <Mail className="h-4 w-4 mr-2 text-slate-400" /> Authorized Contact Vector
            </label>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm text-slate-600 dark:text-slate-400 font-mono text-sm">
              {user?.email}
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Contact vectors are immutable during this deployment phase.</p>
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 mr-2 text-slate-400" /> Access Credentials
            </label>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-sm uppercase">Rotate Encryption Key</p>
                <p className="text-xs text-slate-500 mt-1">Enforce cryptographic security standards.</p>
              </div>
              <button disabled className="text-xs font-semibold uppercase tracking-wider px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-sm text-slate-400 cursor-not-allowed">
                Action Locked
              </button>
            </div>
          </div>
          
          <div className="grid gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center uppercase tracking-wider mt-4">
              <SettingsIcon className="h-4 w-4 mr-2 text-slate-400" /> System Broadcasts
            </label>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm flex justify-between items-center opacity-70">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-sm uppercase">Asynchronous Updates</p>
                <p className="text-xs text-slate-500 mt-1">Receive automated dispatches regarding incident state changes.</p>
              </div>
              <div className="h-6 w-10 bg-slate-700 border border-slate-800 rounded-sm flex items-center px-0.5">
                <div className="h-4 w-4 bg-white rounded-sm translate-x-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
