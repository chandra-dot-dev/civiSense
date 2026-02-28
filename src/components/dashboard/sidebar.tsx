"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  FileText, 
  LayoutDashboard, 
  Settings, 
  Activity, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: string;
}

export function Sidebar({ className, role = "CITIZEN" }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "System Overview",
      icon: LayoutDashboard,
      href: "/dashboard",
      roles: ["CITIZEN", "OFFICER", "ADMIN"],
    },
    {
      label: "My Incident Logs",
      icon: FileText,
      href: "/dashboard/complaints",
      roles: ["CITIZEN"],
    },
    {
      label: "Assigned Queues",
      icon: FileText,
      href: "/dashboard/assigned",
      roles: ["OFFICER", "ADMIN"],
    },
    {
      label: "Metrics & Reports",
      icon: BarChart3,
      href: "/dashboard/analytics",
      roles: ["ADMIN"],
    },
    {
      label: "System Configuration",
      icon: Settings,
      href: "/dashboard/settings",
      roles: ["CITIZEN", "OFFICER", "ADMIN"],
    },
  ];

  const filteredRoutes = routes.filter((route) => route.roles.includes(role));

  return (
    <div className={cn("pb-12 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-0 py-2">
          <Link href="/" className="flex items-center space-x-3 px-6 mb-8 mt-2 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="h-6 w-6 bg-slate-800 dark:bg-slate-200 flex items-center justify-center rounded-sm">
              <Activity className="h-4 w-4 text-white dark:text-slate-900" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white uppercase">
              Civic Operations
            </span>
          </Link>
          <div className="space-y-1 px-3">
            <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Main Menu
            </div>
            {filteredRoutes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Button
                  key={route.href}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start rounded-sm h-10 px-3",
                    isActive 
                      ? "bg-slate-100 dark:bg-slate-900 border-l-2 border-slate-800 dark:border-slate-200 text-slate-900 dark:text-slate-100 font-medium" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-l-2 border-transparent"
                  )}
                  asChild
                >
                  <Link href={route.href}>
                    <route.icon className="mr-3 h-4 w-4" />
                    {route.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
