import { Trophy, Medal, ArrowUp, Minus, ArrowDown } from 'lucide-react';
import { ShinyButton } from '@/components/ui/shiny-button';
import { useGameStore } from '@/store/gameStore';

export default function Leaderboard() {
  const { username, xp, level } = useGameStore();

  // Mock Data
  const leaders = [
    { rank: 1, name: "CyberChef_99", xp: 24500, level: 42, trend: 'up' },
    { rank: 2, name: "TacoTitan", xp: 22100, level: 38, trend: 'same' },
    { rank: 3, name: "SushiSamurai", xp: 21800, level: 37, trend: 'up' },
    { rank: 4, name: "BurgerKing_Real", xp: 18500, level: 30, trend: 'down' },
    { rank: 5, name: "PastaPro", xp: 16200, level: 28, trend: 'same' },
    { rank: 6, name: "DonutDave", xp: 14000, level: 25, trend: 'up' },
    { rank: 7, name: "WaffleWonder", xp: 13500, level: 24, trend: 'down' },
    { rank: 8, name: "PizzaPete", xp: 12000, level: 22, trend: 'same' },
    { rank: 9, name: "SaladSpinner", xp: 11500, level: 21, trend: 'up' },
    { rank: 10, name: "CurryCat", xp: 10000, level: 19, trend: 'down' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-display font-bold tracking-tight">Global Rankings</h1>
        <p className="text-muted-foreground">Top performing agents this season. Ranks update every 24 hours.</p>
      </div>

      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm max-w-4xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-2 md:col-span-1 text-center">Rank</div>
          <div className="col-span-6 md:col-span-5">Agent</div>
          <div className="col-span-2 md:col-span-3 text-right">Level</div>
          <div className="col-span-2 md:col-span-3 text-right">XP</div>
        </div>

        {/* List */}
        <div className="divide-y divide-border">
          {leaders.map((leader) => (
            <div key={leader.rank} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/20 transition-colors">
              <div className="col-span-2 md:col-span-1 flex justify-center">
                {leader.rank <= 3 ? (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg
                    ${leader.rank === 1 ? 'bg-yellow-500' : leader.rank === 2 ? 'bg-slate-400' : 'bg-amber-700'}`}>
                    {leader.rank}
                  </div>
                ) : (
                  <span className="font-mono font-bold text-muted-foreground">#{leader.rank}</span>
                )}
              </div>
              
              <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full hidden md:block" />
                <span className="font-bold text-foreground">{leader.name}</span>
                {leader.trend === 'up' && <ArrowUp size={14} className="text-green-500" />}
                {leader.trend === 'down' && <ArrowDown size={14} className="text-red-500" />}
                {leader.trend === 'same' && <Minus size={14} className="text-muted-foreground" />}
              </div>
              
              <div className="col-span-2 md:col-span-3 text-right font-mono text-muted-foreground">
                Lvl {leader.level}
              </div>
              
              <div className="col-span-2 md:col-span-3 text-right font-bold text-primary">
                {leader.xp.toLocaleString()}
              </div>
            </div>
          ))}

          {/* User Rank (Sticky if functionality added, just static for now) */}
          {username && (
            <div className="grid grid-cols-12 gap-4 p-4 items-center bg-primary/5 border-t-2 border-primary/10">
              <div className="col-span-2 md:col-span-1 text-center font-mono font-bold text-primary">
                #999
              </div>
              <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                <span className="font-bold text-primary">{username} (You)</span>
              </div>
              <div className="col-span-2 md:col-span-3 text-right font-mono text-muted-foreground">
                Lvl {level}
              </div>
              <div className="col-span-2 md:col-span-3 text-right font-bold text-primary">
                {xp.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <ShinyButton variant="outline">View All Divisions</ShinyButton>
      </div>
    </div>
  );
}
