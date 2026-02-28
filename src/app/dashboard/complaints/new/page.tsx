import { ComplaintForm } from "@/components/dashboard/complaint-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewComplaintPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <span className="text-sm font-medium text-slate-500">Back to Dashboard</span>
      </div>
      
      <ComplaintForm />
    </div>
  );
}
