"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, CheckSquare, Loader2 } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function OfficerActionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const supabase = createClient();
  
  const [complaint, setComplaint] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function loadData() {
      const { data } = await supabase.from('complaints').select('*').eq('id', id).single();
      if (data) {
        setComplaint(data);
        setStatus(data.status);
      }
      setLoading(false);
    }
    loadData();
  }, [id, supabase]);

  const handleUpdate = async () => {
    if (!complaint || status === complaint.status) return;
    
    setIsUpdating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      // 1. Update Complaint status
      const { error: updateError } = await supabase
        .from('complaints')
        .update({ 
          status,
          updated_at: new Date().toISOString(),
          ...(status === 'RESOLVED' || status === 'CLOSED' ? { resolved_at: new Date().toISOString() } : {})
        })
        .eq('id', complaint.id);

      if (updateError) throw updateError;

      // 2. Insert into History
      const { error: historyError } = await supabase
        .from('complaint_history')
        .insert({
          complaint_id: complaint.id,
          changed_by: user?.id,
          old_status: complaint.status,
          new_status: status,
          comments: note || 'Status updated without notes.'
        });

      if (historyError) throw historyError;

      router.push("/dashboard/assigned?updated=true");
      router.refresh();

    } catch (e) {
      console.error(e);
      alert("Error updating status");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading details...</div>;
  if (!complaint) return <div className="p-8 text-center text-red-500">Complaint not found</div>;

  return (
    <div className="space-y-6 pb-12 mx-auto max-w-4xl">
      <div className="flex items-center space-x-4 mb-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-800">
          <Link href="/dashboard/assigned">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="text-sm font-medium text-slate-500 flex items-center space-x-2">
          <Link href="/dashboard/assigned" className="hover:text-slate-900 dark:hover:text-slate-200">Active Queue</Link>
          <span>/</span>
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 shadow-sm max-w-[120px] truncate">TKN-{complaint.id.split('-')[0].toUpperCase()}</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Col: Read-only Data */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 right-0 h-full w-2 ${complaint.priority_score > 8 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                {complaint.title}
              </h1>
              <div className="bg-white dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-center shadow-sm shrink-0">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">Priority</span>
                <span className={`text-lg font-black leading-none ${complaint.priority_score > 8 ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'}`}>
                  {complaint.priority_score}/15
                </span>
              </div>
            </div>
            
            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
              <p>{complaint.description}</p>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-slate-400 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Location</p>
                  <p className="text-slate-500 mt-1">{complaint.location_text}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-slate-400 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Reported On</p>
                  <p className="text-slate-500 mt-1">{new Date(complaint.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Action Form */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900 min-h-[400px] rounded-xl p-6 shadow-md shadow-blue-500/5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <CheckSquare className="h-5 w-5 mr-2 text-blue-500" />
              Update Status
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-900 dark:text-white block">Current Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full font-medium">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SUBMITTED">Submitted</SelectItem>
                    <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                    <SelectItem value="ASSIGNED">Assigned (Not Started)</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="RESOLVED">Resolved / Fixed</SelectItem>
                    <SelectItem value="CLOSED">Closed (Duplicate/Invalid)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-900 dark:text-white block">Internal Note <span className="text-slate-400 font-normal">(Visible in audit logs)</span></label>
                <Textarea 
                  placeholder="E.g., Dispatched crew, awaiting materials, or completed fix." 
                  className="min-h-[120px] resize-none"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleUpdate} 
                className="w-full bg-blue-600 hover:bg-blue-700 font-semibold"
                disabled={isUpdating || status === complaint.status}
              >
                {isUpdating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Update"}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
