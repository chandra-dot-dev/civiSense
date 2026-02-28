"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <span className="font-bold tracking-tight text-lg text-slate-900 dark:text-slate-100">
            CivicResolve
          </span>
        </Link>
        <div className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="#features" className="transition-colors hover:text-blue-600 text-slate-600 dark:text-slate-300">Features</Link>
          <Link href="#how-it-works" className="transition-colors hover:text-blue-600 text-slate-600 dark:text-slate-300">How It Works</Link>
          <Link href="/transparency" className="transition-colors hover:text-blue-600 text-slate-600 dark:text-slate-300">Transparency</Link>
        </div>
        <div className="flex items-center space-x-4">
          {!user ? (
            <div className="hidden md:flex gap-2">
              <Button asChild variant="ghost" className="text-sm font-medium">
                <Link href="/sign-in">Log in</Link>
              </Button>
              <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium rounded-full px-6">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          ) : (
            <>
              <Button asChild variant="outline" className="mr-2 text-sm font-medium rounded-full hidden md:flex">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button onClick={handleSignOut} variant="ghost" className="text-sm">Sign out</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
