import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { FOODIMALS, Foodimal } from '@/data/foodimals';
import { ShinyButton } from '@/components/ui/shiny-button';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, Lightbulb, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function Game() {
  const { addXp, addCoins, unlockFoodimal, coins } = useGameStore();
  const { toast } = useToast();
  
  const [currentFoodimal, setCurrentFoodimal] = useState<Foodimal | null>(null);
  const [guess, setGuess] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'success' | 'failed'>('playing');
  const [hintRevealed, setHintRevealed] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    loadNewLevel();
  }, []);

  const loadNewLevel = () => {
    // Simple random selection for now
    const random = FOODIMALS[Math.floor(Math.random() * FOODIMALS.length)];
    setCurrentFoodimal(random);
    setGuess('');
    setGameState('playing');
    setHintRevealed(false);
  };

  const handleGuess = () => {
    if (!currentFoodimal) return;

    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedAnswer = currentFoodimal.name.toLowerCase();
    const normalizedFood = currentFoodimal.food.toLowerCase();
    const normalizedAnimal = currentFoodimal.animal.toLowerCase();

    // Allow exact name or "Food Animal" format
    const isCorrect = 
      normalizedGuess === normalizedAnswer || 
      normalizedGuess === `${normalizedFood} ${normalizedAnimal}` ||
      normalizedGuess === `${normalizedFood}${normalizedAnimal}`;

    if (isCorrect) {
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  const handleSuccess = () => {
    if (!currentFoodimal) return;
    setGameState('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF9F1C', '#2EC4B6', '#FFBF69']
    });
    
    // Rewards
    addXp(50);
    addCoins(10);
    unlockFoodimal(currentFoodimal.id);
  };

  const handleFailure = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
    toast({
      title: "Not quite!",
      description: "Try looking at the shape again.",
      variant: "destructive"
    });
  };

  const revealHint = () => {
    if (coins < 5) {
      toast({ title: "Not enough coins!", variant: "destructive" });
      return;
    }
    addCoins(-5);
    setHintRevealed(true);
  };

  if (!currentFoodimal) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-6">
      
      {/* Card Container */}
      <motion.div 
        layout
        className="w-full max-w-sm bg-card rounded-[2rem] shadow-juicy border-4 border-border p-6 relative overflow-hidden"
      >
        {/* Rarity Badge */}
        <div className={cn(
          "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-2",
          currentFoodimal.rarity === 'Common' && "bg-slate-100 text-slate-600 border-slate-200",
          currentFoodimal.rarity === 'Rare' && "bg-blue-100 text-blue-600 border-blue-200",
          currentFoodimal.rarity === 'Epic' && "bg-purple-100 text-purple-600 border-purple-200",
          currentFoodimal.rarity === 'Legendary' && "bg-amber-100 text-amber-600 border-amber-200",
        )}>
          {currentFoodimal.rarity}
        </div>

        {/* Image Area */}
        <div className="aspect-square rounded-2xl bg-muted/30 mb-6 flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
          {currentFoodimal.image ? (
             <img src={currentFoodimal.image} alt="Foodimal" className="w-full h-full object-cover" />
          ) : (
            <span className="text-6xl opacity-20">?</span>
          )}
        </div>

        {/* Game UI */}
        <AnimatePresence mode="wait">
          {gameState === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl font-display text-primary">{currentFoodimal.name}</h2>
              <p className="text-muted-foreground">{currentFoodimal.description}</p>
              <div className="p-4 bg-accent/10 rounded-xl border-2 border-accent/20 text-sm font-medium text-accent-foreground">
                💡 Fun Fact: {currentFoodimal.fact}
              </div>
              <ShinyButton onClick={loadNewLevel} className="w-full mt-4">
                Next Foodimal <ArrowRight className="inline ml-2" size={20} />
              </ShinyButton>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn("space-y-4", shaking && "animate-shake")}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                  placeholder="What is this?"
                  className="flex-1 h-14 px-4 rounded-xl border-2 border-border font-bold text-lg text-center focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>

              <div className="flex gap-2">
                <ShinyButton 
                  variant="secondary" 
                  className="flex-1" 
                  onClick={handleGuess}
                  disabled={!guess.trim()}
                >
                  GUESS
                </ShinyButton>
              </div>

              <div className="flex justify-center pt-2">
                {!hintRevealed ? (
                  <button 
                    onClick={revealHint}
                    className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    <Lightbulb size={14} /> Reveal Hint (5 Coins)
                  </button>
                ) : (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm font-medium text-primary bg-primary/10 px-3 py-2 rounded-lg"
                  >
                    {currentFoodimal.hint}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

      {/* Give Up Option */}
      {gameState === 'playing' && (
        <button 
          onClick={() => {
            setGameState('success'); 
            toast({ title: "Better luck next time!" });
          }}
          className="text-muted-foreground/50 hover:text-destructive text-sm font-bold flex items-center gap-2"
        >
          <RotateCcw size={14} /> I give up
        </button>
      )}
    </div>
  );
}
