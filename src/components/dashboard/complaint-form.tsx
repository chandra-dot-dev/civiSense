"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { UploadCloud, MapPin, AlertCircle, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// Simplified categories with hardcoded hackathon weights
const CATEGORIES = [
  { id: "roads", name: "Roads & Infrastructure", weight: 3 },
  { id: "water", name: "Water & Sanitation", weight: 4 },
  { id: "electricity", name: "Electricity & Trees", weight: 3 },
  { id: "safety", name: "Public Safety", weight: 5 },
  { id: "others", name: "Others", weight: 1 }
];

const URGENCY_WEIGHTS: Record<string, number> = {
  "LOW": 1,
  "MEDIUM": 2,
  "HIGH": 3,
  "CRITICAL": 5,
};

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(100),
  description: z.string().min(20, "Please provide more details (at least 20 chars).").max(1000),
  categoryId: z.string().min(1, "Please select a category."),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  locationText: z.string().min(5, "Please provide a specific location or address."),
});

export function ComplaintForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [duplicateData, setDuplicateData] = useState<any[]>([]);
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      urgency: "MEDIUM",
      locationText: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setErrorMsg(null);
    
    try {
      // 1. Get current User
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // 2. Calculate simplified priority score for hackathon
      const cat = CATEGORIES.find(c => c.id === values.categoryId);
      const categoryWeight = cat?.weight || 1;
      const urgencyWeight = URGENCY_WEIGHTS[values.urgency] || 2;
      const priorityScore = (categoryWeight * 2) + urgencyWeight;

      // 3. Duplicate Detection Logic (Only run if we haven't warned them yet)
      if (!duplicateWarning) {
        const locationWords = values.locationText.split(' ').filter(w => w.length > 4);
        
        if (locationWords.length > 0) {
          const { data: recentComplaints } = await supabase
            .from('complaints')
            .select('id, title, location_text, status')
            .eq('category_id', values.categoryId)
            .neq('status', 'RESOLVED')
            .neq('status', 'CLOSED')
            .order('created_at', { ascending: false })
            .limit(10);
            
          if (recentComplaints && recentComplaints.length > 0) {
            const matches = recentComplaints.filter(rc => {
              const rcLoc = (rc.location_text || '').toLowerCase();
              return locationWords.some(w => rcLoc.includes(w.toLowerCase()));
            });
            
            if (matches.length > 0) {
              setDuplicateData(matches);
              setDuplicateWarning(true);
              setIsSubmitting(false);
              return; // Halt submission and show warning
            }
          }
        }
      }

      // 4. Insert into Supabase
      const { data, error } = await supabase.from('complaints').insert({
        user_id: user.id,
        category_id: values.categoryId,
        title: values.title,
        description: values.description,
        location_text: values.locationText,
        urgency: values.urgency,
        priority_score: priorityScore,
        image_url: imageUrl,
        status: 'SUBMITTED'
      }).select().single();

      if (error) throw error;

      // 5. Initial history log
      await supabase.from('complaint_history').insert({
        complaint_id: data.id,
        changed_by: user.id,
        new_status: 'SUBMITTED',
        comments: 'Complaint initially submitted by citizen.'
      });

      router.push("/dashboard/complaints?success=true");
      router.refresh();
      
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 max-w-3xl mx-auto shadow-sm">
      <div className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">File a New Complaint</h2>
        <p className="text-slate-500 mt-2">
          Provide as much detail as possible to help authorities resolve the issue faster.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" /> {errorMsg}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complaint Title *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Large pothole on Main Street causing traffic" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map(category => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Urgency Level *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Low - No immediate impact</SelectItem>
                      <SelectItem value="MEDIUM">Medium - Normal issue</SelectItem>
                      <SelectItem value="HIGH">High - Significant disruption</SelectItem>
                      <SelectItem value="CRITICAL">Critical - Safety hazard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed Description *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the issue in detail, including how long it has been there and any potential safety risks..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-8 items-start pt-2 border-t border-slate-100 dark:border-slate-800">
            
            <FormField
              control={form.control}
              name="locationText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-blue-500" /> Location Details *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g. Near the intersection of 5th Ave and Elm St., right in front of the bakery." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Specific cross streets or landmarks help crews find the issue.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="flex items-center mb-3"><UploadCloud className="h-4 w-4 mr-2 text-blue-500" /> Photo Evidence</FormLabel>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center h-[100px]">
                <span className="text-sm text-slate-500 max-w-[200px]">
                  Requires Supabase Storage Bucket setup for demo.
                </span>
                <Button type="button" variant="outline" size="sm" className="mt-4 hidden" onClick={() => setImageUrl("mock-url")}>Mock Upload</Button>
              </div>
            </div>

          </div>

          <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-lg p-4 flex items-start space-x-3 text-sm text-orange-800 dark:text-orange-300">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-orange-600 dark:text-orange-400" />
            <p>Submission of false or misleading complaints may result in account suspension. Please ensure all provided information is accurate.</p>
          </div>

          {duplicateWarning && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-5 mt-6">
              <h4 className="font-bold text-yellow-800 dark:text-yellow-500 mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" /> Possible Duplicate Detected
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-3">
                We found existing active complaints near this location in the same category. Please review them below:
              </p>
              <ul className="list-disc pl-5 text-sm text-yellow-700 dark:text-yellow-400 space-y-1 mb-4">
                {duplicateData.map((dup, i) => (
                  <li key={i}><strong>{dup.title}</strong> ({dup.status})</li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-500">
                Are you sure you still want to submit this new complaint?
              </p>
            </div>
          )}

          <div className="flex justify-end pt-4 space-x-4">
            <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className={`min-w-[150px] ${duplicateWarning ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : duplicateWarning ? "Submit Anyway" : "Submit Complaint"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
