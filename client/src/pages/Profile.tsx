import { useGameStore } from '@/store/gameStore';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Medal, Star, Settings, LogOut, Shield, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  const { username, level, xp, coins, resetProgress } = useGameStore();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 p-6 bg-card rounded-3xl border border-border shadow-sm">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-4xl shadow-xl shadow-primary/20 text-white">
          {username ? username[0].toUpperCase() : 'G'}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-display font-bold text-foreground">{username || 'Guest Agent'}</h1>
          <p className="text-muted-foreground font-medium mb-2">Class A Scout</p>
          <div className="flex gap-2">
             <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">Pro</span>
             <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">Verified</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Medal size={24} />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-foreground">{level}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Level</div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Star size={24} />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-foreground">{coins.toLocaleString()}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Credits</div>
          </div>
        </motion.div>
      </div>

      {/* XP Progress */}
      <div className="bg-card p-8 rounded-3xl border border-border space-y-4 shadow-sm">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="font-display font-bold text-lg">Experience Progress</h3>
            <p className="text-sm text-muted-foreground">Earn {level * 100 - xp} more XP to reach Level {level + 1}</p>
          </div>
          <div className="font-mono font-bold text-primary">{Math.floor((xp / (level * 100)) * 100)}%</div>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
            style={{ width: `${(xp / (level * 100)) * 100}%` }}
          />
        </div>
      </div>

      {/* Account Actions */}
      <div className="space-y-4 pt-4">
        <h3 className="font-display text-xl font-bold px-2">Account Settings</h3>
        
        <div className="bg-card border border-border rounded-2xl divide-y divide-border">
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-muted rounded-lg"><Shield size={18} /></div>
               <span className="font-medium">Privacy & Security</span>
             </div>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-muted rounded-lg"><Crown size={18} /></div>
               <span className="font-medium">Manage Subscription</span>
             </div>
          </button>

          <button 
            onClick={() => {
              if(confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                resetProgress();
              }
            }}
            className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left group"
          >
             <div className="flex items-center gap-3 text-destructive">
               <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg group-hover:bg-red-200 transition-colors"><LogOut size={18} /></div>
               <span className="font-medium">Reset Save Data</span>
             </div>
          </button>
        </div>
      </div>
    </div>
  );
}
