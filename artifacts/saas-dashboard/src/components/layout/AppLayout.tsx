import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, logout } from '../../store';
import { cn } from '../ui/shared';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Users, 
  MessageSquare, 
  Search, 
  Bell, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/whatsapp-dashboard', label: 'WhatsApp', icon: MessageCircle },
  { href: '/agents', label: 'Agents', icon: Users },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const dispatch = useDispatch();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setLocation('/login');
  };

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center px-6 border-b border-border/50">
        <div className="flex items-center gap-2 text-primary">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">SocialOne</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 group",
              isActive 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )} onClick={() => setIsMobileOpen(false)}>
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground")} />
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="p-4 border-t border-border/50">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border bg-sidebar md:flex fixed inset-y-0 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
      
      {/* Mobile Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 flex-col bg-sidebar border-r border-border transition-transform duration-300 md:hidden flex",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:pl-64 min-h-screen">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <button onClick={() => setIsMobileOpen(true)} className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground">
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="relative flex-1 max-w-md hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full border-2 border-border bg-background pl-10 pr-4 py-2 text-sm transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
            />
          </div>
          
          <div className="flex flex-1 items-center justify-end gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border h-8">
              <div className="h-9 w-9 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden">
                {/* using initials or generic user icon */}
                <Users className="h-5 w-5 opacity-50" />
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-semibold leading-none text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground mt-0.5">{user.role || 'Administrator'}</p>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
