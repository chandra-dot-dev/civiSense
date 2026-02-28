"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  FileText, 
  LayoutDashboard, 
  Settings, 
  ShieldCheck, 
  Users 
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: string;
}

export function Sidebar({ className, role = "CITIZEN" }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      roles: ["CITIZEN", "OFFICER", "ADMIN"],
    },
    {
      label: "My Complaints",
      icon: FileText,
      href: "/dashboard/complaints",
      roles: ["CITIZEN"],
    },
    {
      label: "Assigned Issues",
      icon: FileText,
      href: "/dashboard/assigned",
      roles: ["OFFICER", "ADMIN"],
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      roles: ["ADMIN"],
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      roles: ["CITIZEN", "OFFICER", "ADMIN"],
    },
  ];

  const filteredRoutes = routes.filter((route) => route.roles.includes(role));

  return (
    <div className={cn("pb-12 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Link href="/" className="flex items-center space-x-2 px-4 mb-10 mt-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              CivicResolve
            </span>
          </Link>
          <div className="space-y-1">
            {filteredRoutes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === route.href 
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/70" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-3 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Button mock for internal use in sidebar since we just need it styled
import { Button } from "@/components/ui/button";
