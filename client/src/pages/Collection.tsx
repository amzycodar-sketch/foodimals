import { useGameStore } from '@/store/gameStore';
import { FOODIMALS } from '@/data/foodimals';
import { Lock, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShinyButton } from '@/components/ui/shiny-button';
import { motion } from 'framer-motion';

export default function Collection() {
  const { unlockedFoodimals } = useGameStore();

  const unlockedCount = unlockedFoodimals.length;
  const totalCount = FOODIMALS.length;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-foreground mb-2">Database</h1>
          <p className="text-muted-foreground">Manage and view your collected specimens.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-card border border-border p-1 rounded-xl shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 bg-transparent text-sm font-medium focus:outline-none w-32 md:w-48"
            />
          </div>
          <div className="h-6 w-px bg-border mx-1" />
          <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors">
            <Filter size={16} />
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-3">
        <div className="flex justify-between text-sm font-semibold">
          <span className="text-muted-foreground">Collection Progress</span>
          <span className="text-primary">{Math.round((unlockedCount / totalCount) * 100)}% Complete</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {FOODIMALS.map((foodimal, index) => {
          const isUnlocked = unlockedFoodimals.includes(foodimal.id);
          
          return (
            <motion.div 
              key={foodimal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "aspect-[3/4] rounded-2xl border p-4 flex flex-col items-center justify-between transition-all group relative overflow-hidden",
                isUnlocked 
                  ? "bg-card border-border shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer" 
                  : "bg-muted/20 border-border/50 opacity-60"
              )}
            >
              {/* Background Gradient for unlocked items */}
              {isUnlocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}

              <div className="w-full aspect-square rounded-xl bg-muted/30 flex items-center justify-center overflow-hidden relative z-10">
                {isUnlocked ? (
                  foodimal.image ? (
                    <img src={foodimal.image} alt={foodimal.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <span className="text-4xl">🐾</span>
                  )
                ) : (
                  <Lock className="text-muted-foreground/30" size={24} />
                )}
              </div>
              
              <div className="text-center w-full relative z-10 pt-3">
                {isUnlocked ? (
                  <>
                    <h3 className="font-display font-bold text-sm truncate group-hover:text-primary transition-colors">{foodimal.name}</h3>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                        foodimal.rarity === 'Legendary' ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground"
                      )}>
                        {foodimal.rarity}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="h-4 w-12 bg-border/50 rounded-md mx-auto mt-2" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
