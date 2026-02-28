"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";
import { StatusTimeline } from "@/components/dashboard/status-timeline";
import { createClient } from "@/utils/supabase/client";

export default function ComplaintDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const supabase = createClient();

  const [complaint, setComplaint] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      // Fetch complaint
      const { data: compData } = await supabase.from('complaints').select('*').eq('id', id).single();
      
      // Fetch history for timeline
      const { data: histData } = await supabase.from('complaint_history').select('*').eq('complaint_id', id).order('created_at', { ascending: true });
      
      if (compData) setComplaint(compData);
      if (histData) setHistory(histData);
      
      setLoading(false);
    }
    
    fetchData();
  }, [id, supabase]);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading complaint details...</div>;
  if (!complaint) return <div className="p-8 text-center text-red-500">Complaint not found</div>;

  // Process timeline events based on history
  const timelineData = history.map((event, idx) => ({
    status: event.new_status,
    date: new Date(event.created_at).toLocaleString(),
    description: event.comments || "Status updated",
    isCompleted: idx < history.length - 1,
    isCurrent: idx === history.length - 1,
  }));

  const getCategoryName = (catId: string) => {
    switch(catId) {
      case 'roads': return 'Roads & Infrastructure';
      case 'water': return 'Water & Sanitation';
      case 'electricity': return 'Electricity & Trees';
      case 'safety': return 'Public Safety';
      default: return 'Others';
    }
  };

  return (
    <div className="space-y-6 pb-12 mx-auto max-w-5xl">
      <div className="flex items-center space-x-4 mb-8">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-800">
          <Link href="/dashboard/complaints">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="text-sm font-medium text-slate-500 flex items-center space-x-2">
          <Link href="/dashboard/complaints" className="hover:text-slate-900 dark:hover:text-slate-200">Complaints</Link>
          <span>/</span>
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 shadow-sm max-w-[120px] truncate">
            TKN-{complaint.id.split('-')[0].substring(0, 5).toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 px-3 py-1 rounded-full">
                {getCategoryName(complaint.category_id)}
              </span>
              <span className={`inline-flex items-center text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full
                 ${complaint.urgency === 'CRITICAL' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400'}`}>
                {complaint.urgency} PRIORITY
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              {complaint.title}
            </h1>
            
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <p>{complaint.description}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Location</p>
                  <p className="text-slate-500">{complaint.location_text}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Date Submitted</p>
                  <p className="text-slate-500">{new Date(complaint.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            {/* Image Placeholder */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Attached Evidence</h3>
              <div className="aspect-video w-full max-w-md bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <span className="text-slate-400 text-sm flex items-center px-4 text-center">
                  <AlertCircle className="h-4 w-4 mr-2" /> No image uploaded
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Status Tracker</h3>
             {history.length > 0 ? (
                 <StatusTimeline events={timelineData} />
             ) : (
                 <p className="text-sm text-slate-500">No updates yet.</p>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
