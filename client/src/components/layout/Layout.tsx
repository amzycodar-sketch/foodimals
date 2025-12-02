import { Link, useLocation } from 'wouter';
import { Home, Gamepad2, Library, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/play', icon: Gamepad2, label: 'Play' },
    { href: '/collection', icon: Library, label: 'Dex' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-background font-body pb-24 sm:pb-0 sm:pt-20">
      <main className="container mx-auto px-4 py-6 max-w-md sm:max-w-2xl">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-6 left-4 right-4 bg-card rounded-3xl shadow-2xl border-2 border-border p-2 flex justify-around items-center z-50 sm:hidden">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-200",
                isActive ? "bg-primary/10 text-primary translate-y-[-8px]" : "text-muted-foreground hover:bg-muted"
              )}>
                <item.icon 
                  size={28} 
                  strokeWidth={isActive ? 3 : 2}
                  className={cn("mb-1 transition-all", isActive ? "scale-110" : "scale-100")} 
                />
                <span className="text-[10px] font-bold uppercase">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Desktop Top Nav */}
      <nav className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-md border-b border-border hidden sm:flex justify-center z-50">
        <div className="container max-w-4xl px-6 h-16 flex items-center justify-between">
           <div className="text-2xl font-display font-black text-primary tracking-tight">
             FOODIMALS
           </div>
           <div className="flex gap-2">
             {navItems.map((item) => {
               const isActive = location === item.href;
               return (
                 <Link key={item.href} href={item.href}>
                   <div className={cn(
                     "px-4 py-2 rounded-xl font-bold transition-all cursor-pointer",
                     isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                   )}>
                     {item.label}
                   </div>
                 </Link>
               );
             })}
           </div>
        </div>
      </nav>
    </div>
  );
}
