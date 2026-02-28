"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, BarChart3, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-24 pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-8"
          >
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
              Enterprise-Grade Public Grievance System
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Transparent <span className="text-blue-600 dark:text-blue-500">Governance</span> <br className="hidden lg:block" />Starts Here.
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-[600px] leading-relaxed">
              Empowering citizens to report issues, enabling authorities to track resolution, and providing administrators with real-time performance metrics in one secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all font-semibold">
                <Link href="/sign-up">
                  Submit Complaint <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full border-slate-300 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
                <Link href="/sign-in">
                  Authority Login
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Animated Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-[600px] aspect-square lg:aspect-auto lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl transform rotate-3 scale-105 border border-slate-200 dark:border-slate-800 shadow-2xl z-0"></div>
            
            <div className="relative z-10 h-full w-full bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
              {/* Fake Browser/App Header */}
              <div className="h-12 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center px-4 space-x-2">
                <div className="flex space-x-1.5 pl-2">
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                </div>
                <div className="mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md h-6 w-1/2 flex items-center justify-center">
                  <span className="text-[10px] text-slate-400">civicresolve.gov</span>
                </div>
              </div>

              {/* Fake Dashboard Content */}
              <div className="flex-1 p-6 grid grid-cols-3 grid-rows-4 gap-4 bg-slate-50/30 dark:bg-slate-950">
                {/* Stats cards */}
                <div className="col-span-1 row-span-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-center">
                  <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2">
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="h-2 w-16 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
                  <div className="h-4 w-10 bg-slate-800 dark:bg-slate-200 rounded"></div>
                </div>
                
                <div className="col-span-1 row-span-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-center">
                  <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-2">
                    <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="h-2 w-20 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
                  <div className="h-4 w-12 bg-slate-800 dark:bg-slate-200 rounded"></div>
                </div>

                <div className="col-span-1 row-span-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-center">
                  <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center mb-2">
                    <BarChart3 className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="h-2 w-14 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
                  <div className="h-4 w-8 bg-slate-800 dark:bg-slate-200 rounded"></div>
                </div>

                {/* Main chart area */}
                <div className="col-span-3 row-span-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 shadow-sm relative overflow-hidden">
                  <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-6"></div>
                  
                  {/* Fake Bar Chart */}
                  <div className="flex items-end space-x-2 h-32 mt-auto w-full absolute bottom-4 px-4">
                    {[40, 70, 45, 90, 65, 80, 55, 100, 75, 40].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        className="flex-1 bg-blue-500/20 dark:bg-blue-500/30 rounded-t-sm"
                      >
                        <div className="w-full bg-blue-600 h-1 rounded-t-sm"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* List area */}
                <div className="col-span-3 row-span-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-3 w-3/4 bg-slate-800 dark:bg-slate-200 rounded mb-2"></div>
                      <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    </div>
                    <div className="h-6 w-16 rounded-full bg-green-100 dark:bg-green-900/50"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
