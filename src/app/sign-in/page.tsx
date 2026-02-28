"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm shadow-sm p-8">
        <div className="flex justify-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-6">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-slate-900 dark:text-white" />
            <span className="font-bold tracking-widest uppercase text-xl text-slate-900 dark:text-white">
              CivicSense
            </span>
          </Link>
        </div>
        
        <h1 className="text-xl font-bold text-center mb-2 text-slate-900 dark:text-white uppercase tracking-wider">Authentication Required</h1>
        <p className="text-xs font-mono text-center text-slate-500 mb-8 uppercase tracking-widest">Provide authorized credentials</p>

        {error && (
          <div className="mb-4 p-3 rounded-sm bg-red-50 text-red-600 border border-red-200 text-xs font-mono uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">Assigned Vector (Email)</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="OPERATIVE@CIVICSENSE.GOV" 
              required 
              className="rounded-sm font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
             <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider">Security Passkey</Label>
            </div>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="rounded-sm font-mono text-sm tracking-widest"
            />
          </div>
          <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-sm font-bold uppercase tracking-widest text-xs h-10 mt-6" disabled={isLoading}>
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</> : "Initialize Session"}
          </Button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500 uppercase tracking-widest font-mono">
          Unauthorized access prohibited.{" "}
          <Link href="/sign-up" className="text-slate-900 dark:text-white hover:underline font-bold mt-2 block">
            Request Clearance (Sign Up)
          </Link>
        </div>
      </div>
    </div>
  );
}
