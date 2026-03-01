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
          <Link href="/" className="flex items-center space-x-3 px-6 mb-8 mt-2 pb-6 border-b border-border">
            <div className="h-8 w-8 bg-primary flex items-center justify-center rounded-lg shadow-sm">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Civic Operations
            </span>
          </Link>
          <div className="space-y-1 px-3">
            <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Main Menu
            </div>
            {filteredRoutes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Button
                  key={route.href}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start rounded-md h-10 px-3",
                    isActive 
                      ? "bg-blue-50 dark:bg-blue-950/50 border-l-2 border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400 font-medium" 
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
