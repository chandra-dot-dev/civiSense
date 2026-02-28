import Link from "next/link";
import { ShieldCheck, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 md:py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <ShieldCheck className="h-7 w-7 text-blue-500" />
              <span className="font-bold tracking-tight text-xl text-white">
                CivicResolve
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Next-generation public grievance management system built for transparency and accountability.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-slate-500 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-500 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-500 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-blue-400 transition-colors">How it Works</Link></li>
              <li><Link href="/transparency" className="hover:text-blue-400 transition-colors">Transparency Portal</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing for Gov</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/docs" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
              <li><Link href="/api" className="hover:text-blue-400 transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Support Center</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">System Status</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Security Audits</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} CivicResolve Inc. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
