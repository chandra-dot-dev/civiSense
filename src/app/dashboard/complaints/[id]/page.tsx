import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";
import { StatusTimeline } from "@/components/dashboard/status-timeline";

// Mock Data
const complaint = {
  id: "COMP-9281A",
  title: "Large pothole on Elm St causing traffic hazard",
  description: "There is a massive pothole in the right lane of Elm St just before the intersection with 5th Ave. It has been there for 3 days and I saw two cars damage their tires yesterday. Needs immediate attention before someone gets seriously hurt.",
  category: "Roads & Infrastructure",
  status: "IN_PROGRESS",
  urgency: "HIGH",
  location: "Elm St & 5th Ave, right lane",
  date: "Oct 24, 2026",
  assignedTo: "Officer David M.",
};

const timelineData = [
  { status: "SUBMITTED", date: "Oct 24, 09:15 AM", description: "Complaint received by the system.", isCompleted: true, isCurrent: false },
  { status: "UNDER_REVIEW", date: "Oct 24, 10:30 AM", description: "Complaint passed automated AI check and is under manual review.", isCompleted: true, isCurrent: false },
  { status: "ASSIGNED", date: "Oct 24, 02:45 PM", description: "Assigned to Public Works Department (Officer David M.)", isCompleted: true, isCurrent: false },
  { status: "IN_PROGRESS", date: "Oct 25, 08:00 AM", description: "Crew dispatched to location to assess materials needed.", isCompleted: false, isCurrent: true },
  { status: "RESOLVED", date: "Pending", description: "Awaiting final repair and verification.", isCompleted: false, isCurrent: false },
];

export default function ComplaintDetailPage() {
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
          <span className="text-slate-900 dark:text-slate-200">{complaint.id}</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 px-3 py-1 rounded-full">
                {complaint.category}
              </span>
              <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 px-3 py-1 rounded-full">
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
                  <p className="text-slate-500">{complaint.location}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Date Submitted</p>
                  <p className="text-slate-500">{complaint.date}</p>
                </div>
              </div>
            </div>
            
            {/* Image Placeholder */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Attached Evidence</h3>
              <div className="aspect-video w-full max-w-md bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <span className="text-slate-400 text-sm flex items-center px-4 text-center">
                  <AlertCircle className="h-4 w-4 mr-2" /> Image uploaded by citizen (Image mock)
                </span>
              </div>
            </div>
          </div>
          
          {/* Discussion Thread stub */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Updates & Notes</h3>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-lg text-center border border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-500">No public internal notes added yet.</p>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Status Tracker</h3>
            <StatusTimeline events={timelineData} />
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Assignment Info</h3>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                DO
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{complaint.assignedTo}</p>
                <p className="text-xs text-slate-500">Public Works Dept.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
