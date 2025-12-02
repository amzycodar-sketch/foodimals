import { Link, useLocation } from 'wouter';
import { Home, Gamepad2, Library, User, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/play', icon: Gamepad2, label: 'Play' },
    { href: '/collection', icon: Library, label: 'Dex' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-background font-body selection:bg-primary/30">
      
      {/* Desktop Navigation - High End SaaS Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-gradient-to-tr from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
                F
              </div>
              <span className="text-xl font-display font-bold tracking-tight group-hover:text-primary transition-colors">
                Foodimals
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div className={cn(
                    "px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer relative",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
             <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
               Log In
             </button>
             <button className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-bold hover:bg-foreground/90 transition-colors">
               Get Pro
             </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden text-foreground">
             <Menu />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-24 max-w-5xl">
        {children}
      </main>

      {/* Mobile Bottom Bar - Glassmorphism */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-2xl border-t border-border md:hidden z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex flex-col items-center justify-center w-full h-full px-4 gap-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}>
                  <item.icon 
                    size={24} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={cn("transition-transform", isActive && "scale-110")}
                  />
                  <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
