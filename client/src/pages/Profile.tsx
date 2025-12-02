import { useGameStore } from '@/store/gameStore';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Medal, Star, Settings } from 'lucide-react';

export default function Profile() {
  const { username, level, xp, coins, resetProgress } = useGameStore();

  return (
    <div className="space-y-8">
      <div className="text-center pt-8">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-juicy-primary border-4 border-white">
          👨‍🍳
        </div>
        <h1 className="text-3xl font-display text-foreground">{username || 'Guest Chef'}</h1>
        <p className="text-muted-foreground font-medium">Master Foodimal Hunter</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-2xl border-2 border-border shadow-sm flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Medal size={20} />
          </div>
          <div className="text-center">
            <div className="text-2xl font-display text-foreground">{level}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase">Level</div>
          </div>
        </div>
        
        <div className="bg-card p-4 rounded-2xl border-2 border-border shadow-sm flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
            <Star size={20} />
          </div>
          <div className="text-center">
            <div className="text-2xl font-display text-foreground">{coins}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase">Coins</div>
          </div>
        </div>
      </div>

      {/* XP Progress */}
      <div className="bg-card p-6 rounded-3xl border-2 border-border space-y-2">
        <div className="flex justify-between text-sm font-bold">
          <span>XP Progress</span>
          <span>{xp} / {level * 100}</span>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary transition-all duration-1000"
            style={{ width: `${(xp / (level * 100)) * 100}%` }}
          />
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        <h3 className="font-display text-xl flex items-center gap-2">
          <Settings size={20} /> Settings
        </h3>
        
        <ShinyButton 
          variant="destructive" 
          className="w-full" 
          onClick={() => {
            if(confirm('Are you sure you want to reset all progress?')) {
              resetProgress();
            }
          }}
        >
          Reset Save Data
        </ShinyButton>
      </div>
    </div>
  );
}
