"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, BarChart3, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-24 pb-32 border-b border-slate-200 dark:border-slate-800">
      {/* Structural decoration only */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#slate-200_1px,transparent_1px),linear-gradient(to_bottom,#slate-200_1px,transparent_1px)] bg-[size:32px_32px] dark:opacity-10 opacity-50"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col space-y-8"
          >
            <div className="inline-flex items-center rounded-sm border border-slate-300 bg-slate-100 px-3 py-1 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-slate-600 mr-2"></span>
              Civic Operations System v2.1
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
              Municipal Data <br className="hidden lg:block" />& Resolution Hub
            </h1>

            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-[600px] leading-relaxed">
              Secure infrastructure for logging public grievances, tracking departmental resolution, and maintaining verifiable civic accountability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="h-12 px-8 rounded-sm font-medium">
                <Link href="/sign-up">
                  Submit Record <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 rounded-sm border-slate-300 font-medium">
                <Link href="/sign-in">
                  Authority Access
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
            <div className="relative z-10 h-full w-full bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-300 dark:border-slate-700 overflow-hidden flex flex-col">
              {/* Fake System Header */}
              <div className="h-10 border-b border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-950 flex items-center px-4 space-x-4">
                <div className="flex space-x-2 pl-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-slate-400 dark:bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-slate-400 dark:bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-slate-400 dark:bg-slate-700"></div>
                </div>
                <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-sm h-6 flex items-center px-2">
                  <span className="text-[11px] text-slate-500 font-mono">192.168.1.1/dashboard</span>
                </div>
              </div>

              {/* Data Grid Content */}
              <div className="flex-1 p-6 grid grid-cols-3 grid-rows-4 gap-4 bg-white dark:bg-slate-950">
                {/* Metric cards */}
                <div className="col-span-1 row-span-1 rounded-sm border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-center">
                  <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Total Active</div>
                  <div className="text-2xl font-semibold text-slate-900 dark:text-white">1,204</div>
                </div>
                
                <div className="col-span-1 row-span-1 rounded-sm border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-center">
                  <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Resolved</div>
                  <div className="text-2xl font-semibold text-slate-900 dark:text-white">842</div>
                </div>

                <div className="col-span-1 row-span-1 rounded-sm border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-center">
                  <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Critical</div>
                  <div className="text-2xl font-semibold text-slate-900 dark:text-white">12</div>
                </div>

                {/* Table representation */}
                <div className="col-span-3 row-span-2 rounded-sm border border-slate-200 dark:border-slate-800 p-0 flex flex-col">
                  <div className="h-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center px-4">
                    <div className="text-xs text-slate-500 font-medium">Recent Activity Log</div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800/50 pb-2">
                        <div className="w-16 h-4 bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
                        <div className="flex-1 h-4 bg-slate-100 dark:bg-slate-800 rounded-sm"></div>
                        <div className="w-20 h-4 bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status bar */}
                <div className="col-span-3 row-span-1 rounded-sm border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-600">System Secure</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">Uptime: 99.9%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
