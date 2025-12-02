import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { FOODIMALS, Foodimal } from '@/data/foodimals';
import { ShinyButton } from '@/components/ui/shiny-button';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, Lightbulb, Flag, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function Game() {
  const { addXp, addCoins, unlockFoodimal, coins } = useGameStore();
  const { toast } = useToast();
  
  const [currentFoodimal, setCurrentFoodimal] = useState<Foodimal | null>(null);
  const [guess, setGuess] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'success'>('playing');
  const [hintRevealed, setHintRevealed] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    loadNewLevel();
  }, []);

  const loadNewLevel = () => {
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
      colors: ['#6366f1', '#ec4899', '#06b6d4'] // Updated to match theme
    });
    
    addXp(50);
    addCoins(10);
    unlockFoodimal(currentFoodimal.id);
  };

  const handleFailure = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
    toast({
      title: "Analysis Failed",
      description: "Incorrect species identification. Try again.",
      variant: "destructive"
    });
  };

  const revealHint = () => {
    if (coins < 5) {
      toast({ title: "Insufficient Credits", description: "You need 5 credits to unlock a hint.", variant: "destructive" });
      return;
    }
    addCoins(-5);
    setHintRevealed(true);
  };

  if (!currentFoodimal) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-4xl mx-auto">
      
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 w-full items-center">
        
        {/* Left Column: Image */}
        <motion.div 
          layout
          className="relative aspect-square bg-card rounded-3xl shadow-2xl border border-border overflow-hidden group"
        >
          {/* Rarity Tag */}
          <div className={cn(
            "absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border backdrop-blur-md z-10",
            currentFoodimal.rarity === 'Common' && "bg-slate-100/80 text-slate-600 border-slate-200",
            currentFoodimal.rarity === 'Rare' && "bg-blue-100/80 text-blue-600 border-blue-200",
            currentFoodimal.rarity === 'Epic' && "bg-purple-100/80 text-purple-600 border-purple-200",
            currentFoodimal.rarity === 'Legendary' && "bg-amber-100/80 text-amber-600 border-amber-200",
          )}>
            {currentFoodimal.rarity} Class
          </div>

          {currentFoodimal.image ? (
             <img src={currentFoodimal.image} alt="Foodimal" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-6xl opacity-20">?</span>
            </div>
          )}
        </motion.div>

        {/* Right Column: Interaction */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest">Identify Specimen</h2>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {gameState === 'success' ? currentFoodimal.name : 'Unknown Hybrid'}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {gameState === 'success' ? currentFoodimal.description : "Analyze the visual characteristics. Combine the food source and animal species to identify."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {gameState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-xl flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <div className="font-bold text-green-800 dark:text-green-400">Identification Confirmed</div>
                    <div className="text-sm text-green-700 dark:text-green-500/80">Database updated. +50 XP earned.</div>
                  </div>
                </div>
                <ShinyButton onClick={loadNewLevel} size="lg" className="w-full">
                  Next Specimen <ArrowRight size={20} />
                </ShinyButton>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn("space-y-4", shaking && "animate-shake")}
              >
                <div className="relative">
                  <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                    placeholder="Enter species name..."
                    className="w-full h-16 pl-6 pr-4 rounded-2xl bg-background border-2 border-border text-xl font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3">
                  <ShinyButton 
                    size="lg"
                    className="flex-1" 
                    onClick={handleGuess}
                    disabled={!guess.trim()}
                  >
                    Identify
                  </ShinyButton>
                  
                  <ShinyButton 
                    variant="outline"
                    size="lg"
                    className="px-4"
                    onClick={revealHint}
                    disabled={hintRevealed}
                  >
                    {hintRevealed ? (
                      <span className="text-primary">{currentFoodimal.hint}</span>
                    ) : (
                      <div className="flex items-center gap-2">
                         <Lightbulb size={20} />
                         <span>Hint (-5)</span>
                      </div>
                    )}
                  </ShinyButton>
                </div>

                <button 
                  onClick={() => {
                    setGameState('success'); 
                    toast({ title: "Mission Aborted", variant: "destructive" });
                  }}
                  className="text-muted-foreground hover:text-destructive text-sm font-medium flex items-center gap-2 mx-auto pt-2 transition-colors"
                >
                  <Flag size={14} /> Abort Identification
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
