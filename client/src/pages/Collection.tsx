import { useGameStore } from '@/store/gameStore';
import { FOODIMALS } from '@/data/foodimals';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Collection() {
  const { unlockedFoodimals } = useGameStore();

  const unlockedCount = unlockedFoodimals.length;
  const totalCount = FOODIMALS.length;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-display text-primary mb-2">Foodimal Dex</h1>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
          <span>{unlockedCount}/{totalCount} Found</span>
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {FOODIMALS.map((foodimal) => {
          const isUnlocked = unlockedFoodimals.includes(foodimal.id);
          
          return (
            <div 
              key={foodimal.id}
              className={cn(
                "aspect-[3/4] rounded-2xl border-2 border-border p-3 flex flex-col items-center justify-between transition-all",
                isUnlocked ? "bg-card shadow-sm hover:scale-105 hover:shadow-md cursor-pointer" : "bg-muted/50 opacity-70"
              )}
            >
              <div className="w-full aspect-square rounded-xl bg-muted/30 flex items-center justify-center overflow-hidden">
                {isUnlocked ? (
                  foodimal.image ? (
                    <img src={foodimal.image} alt={foodimal.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">🐾</span>
                  )
                ) : (
                  <Lock className="text-muted-foreground/40" size={32} />
                )}
              </div>
              
              <div className="text-center w-full">
                {isUnlocked ? (
                  <>
                    <h3 className="font-display font-bold text-sm truncate">{foodimal.name}</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{foodimal.rarity}</p>
                  </>
                ) : (
                  <div className="h-4 w-16 bg-border/50 rounded-full mx-auto mt-2" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
