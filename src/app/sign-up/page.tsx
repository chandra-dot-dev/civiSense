"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("CITIZEN");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: role, // Storing role in user metadata
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setSuccess(true);
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm shadow-sm p-8 text-center">
          <ShieldCheck className="h-10 w-10 text-slate-900 dark:text-white mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2 uppercase tracking-wide">Verification Dispatched</h2>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-6 uppercase tracking-widest leading-relaxed">
            Transmission sent to:<br/><strong className="text-slate-900 dark:text-white mt-1 block">{email}</strong>
          </p>
          <Button asChild className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-sm font-bold uppercase tracking-widest text-xs h-10 mt-6">
            <Link href="/sign-in">Acknowledge & Return</Link>
          </Button>
        </div>
      </div>
    );
  }

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
        
        <h1 className="text-xl font-bold text-center mb-2 text-slate-900 dark:text-white uppercase tracking-wider">Clearance Request</h1>
        <p className="text-xs font-mono text-center text-slate-500 mb-8 uppercase tracking-widest">Register identity in system registry</p>

        {error && (
          <div className="mb-4 p-3 rounded-sm bg-red-50 text-red-600 border border-red-200 text-xs font-mono uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider">Legal Designation (Name)</Label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="JOHN DOE" 
              required 
              className="rounded-sm font-mono text-sm uppercase"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">Contact Vector (Email)</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="OPERATIVE@CIVICSENSE.GOV" 
              required 
              className="rounded-sm font-mono text-sm uppercase"
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
          
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider">Clearance Level (Demo Bypass)</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="rounded-sm font-mono text-xs uppercase tracking-wider">
                <SelectValue placeholder="Select clearance" />
              </SelectTrigger>
              <SelectContent className="rounded-sm font-mono text-xs uppercase tracking-wider">
                <SelectItem value="CITIZEN">Standard Civilian (Report)</SelectItem>
                <SelectItem value="OFFICER">Field Operative (Resolve)</SelectItem>
                <SelectItem value="ADMIN">Command Center (Analytics)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-sm font-bold uppercase tracking-widest text-xs h-10 mt-6" disabled={isLoading}>
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Transmitting...</> : "Submit Request"}
          </Button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500 uppercase tracking-widest font-mono">
          Already possess clearance?{" "}
          <Link href="/sign-in" className="text-slate-900 dark:text-white hover:underline font-bold mt-2 block">
            Initialize Session (Sign In)
          </Link>
        </div>
      </div>
    </div>
  );
}
