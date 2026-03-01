"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32 border-b border-border">
      {/* Structural decoration only */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:32px_32px] dark:opacity-5 opacity-50"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col space-y-8"
          >
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-300 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              Civic Operations System
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight">
              Municipal Data <br className="hidden lg:block" />& Resolution Hub
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] leading-relaxed">
              Secure infrastructure for logging public grievances, tracking departmental resolution, and maintaining verifiable civic accountability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/sign-up">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base bg-background">
                <Link href="/sign-in">
                  Authority Login
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Structured Dashboard Graphic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative lg:ml-auto w-full max-w-[600px] aspect-square lg:aspect-auto lg:h-[600px]"
          >
            <div className="relative z-10 h-full w-full bg-background rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col">
              {/* Fake System Header */}
              <div className="h-12 border-b border-border bg-muted/30 flex items-center px-4 space-x-4">
                <div className="flex space-x-2 pl-2">
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                </div>
                <div className="flex-1 bg-background border border-border rounded-md h-7 flex items-center justify-center">
                  <span className="text-[11px] text-muted-foreground font-medium">app.civicsense.gov</span>
                </div>
                <div className="w-16"></div>
              </div>

              {/* Data Grid Content */}
              <div className="flex-1 p-6 grid grid-cols-3 grid-rows-4 gap-4 bg-muted/10">
                {/* Metric cards */}
                <div className="col-span-1 row-span-1 rounded-lg border border-border bg-card p-4 flex flex-col justify-center shadow-sm">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Total Active</div>
                  <div className="text-2xl font-bold text-foreground">1,204</div>
                </div>
                
                <div className="col-span-1 row-span-1 rounded-lg border border-border bg-card p-4 flex flex-col justify-center shadow-sm">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Resolved</div>
                  <div className="text-2xl font-bold text-foreground">842</div>
                </div>

                <div className="col-span-1 row-span-1 rounded-lg border border-border bg-card p-4 flex flex-col justify-center shadow-sm">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Critical</div>
                  <div className="text-2xl font-bold text-foreground">12</div>
                </div>

                {/* Table representation */}
                <div className="col-span-3 row-span-2 rounded-lg border border-border bg-card flex flex-col shadow-sm overflow-hidden">
                  <div className="h-10 border-b border-border bg-muted/30 flex items-center px-4">
                    <div className="text-xs font-medium text-muted-foreground">Recent Activity Log</div>
                  </div>
                  <div className="flex-1 p-5 flex flex-col gap-4 justify-center">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="w-12 h-3 bg-muted rounded-full"></div>
                        <div className="flex-1 h-3 bg-muted/60 rounded-full"></div>
                        <div className="w-16 h-3 bg-muted rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status bar */}
                <div className="col-span-3 row-span-1 border border-border rounded-lg bg-blue-50 dark:bg-blue-900/10 p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-300">System Secure & Active</span>
                  </div>
                  <div className="text-sm font-medium text-blue-700 dark:text-blue-400">99.9% Uptime</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
