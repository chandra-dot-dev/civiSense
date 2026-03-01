"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, AlertCircle, ImageIcon } from "lucide-react";
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

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading details...</div>;
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
      <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Link href="/dashboard/complaints">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
            <Link href="/dashboard/complaints" className="hover:text-foreground">Incidents</Link>
            <span>/</span>
            <span className="text-sm font-semibold text-foreground">
              #{complaint.id.split('-')[0].substring(0, 5)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-border">
              <span className="inline-flex items-center text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md">
                {getCategoryName(complaint.category_id)}
              </span>
              <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md border
                 ${complaint.urgency === 'CRITICAL' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-400' : 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-900/50 dark:text-orange-400'}`}>
                {complaint.urgency} Priority
              </span>
            </div>
            
            <h1 className="text-2xl font-bold tracking-tight text-foreground mb-6">
              {complaint.title}
            </h1>
            
            <div className="prose dark:prose-invert max-w-none text-muted-foreground text-sm leading-relaxed">
              <p>{complaint.description}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-border grid sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">Location</p>
                  <p className="text-muted-foreground text-sm">{complaint.location_text}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">Date Submitted</p>
                  <p className="text-muted-foreground text-sm">{new Date(complaint.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            {/* Image Placeholder */}
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-sm font-semibold text-foreground mb-4 border-l-2 border-primary pl-2">Attached Images</h3>
              <div className="aspect-video w-full max-w-md bg-muted/50 border border-border rounded-lg flex items-center justify-center p-4">
                <span className="text-muted-foreground text-sm flex items-center">
                  <ImageIcon className="h-4 w-4 mr-2" /> No images provided
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-semibold tracking-tight text-foreground mb-6 pb-4 border-b border-border border-l-2 border-primary pl-2">Timeline</h3>
             {history.length > 0 ? (
                 <StatusTimeline events={timelineData} />
             ) : (
                 <p className="text-sm text-muted-foreground">No recent updates.</p>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
