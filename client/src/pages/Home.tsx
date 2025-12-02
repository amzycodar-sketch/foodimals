import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useGameStore } from '@/store/gameStore';
import { ShinyButton } from '@/components/ui/shiny-button';
import { motion } from 'framer-motion';
import { Trophy, Star, Flame } from 'lucide-react';
import logoImg from '@assets/generated_images/colorful_playful_logo_for_foodimals_game.png';

export default function Home() {
  const [, setLocation] = useLocation();
  const { username, level, coins, setUsername } = useGameStore();
  const [nameInput, setNameInput] = useState('');
  const [isEditingName, setIsEditingName] = useState(!username);

  const handleStart = () => {
    if (!username && !nameInput.trim()) return;
    if (!username) setUsername(nameInput);
    setIsEditingName(false);
  };

  if (isEditingName) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
        <motion.img 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: 'spring', bounce: 0.5 }}
          src={logoImg} 
          alt="Foodimals Logo" 
          className="w-64 h-64 object-contain drop-shadow-xl"
        />
        
        <div className="space-y-4 w-full max-w-xs">
          <h1 className="text-3xl font-display text-primary">Welcome, Chef!</h1>
          <p className="text-muted-foreground font-medium">Enter your name to start collecting Foodimals.</p>
          
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Your Name"
            className="w-full h-14 px-6 rounded-2xl border-2 border-border text-xl font-bold text-center focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
          />
          
          <ShinyButton 
            className="w-full" 
            onClick={handleStart}
            disabled={!nameInput.trim()}
          >
            Let's Go!
          </ShinyButton>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header Stats */}
      <header className="flex items-center justify-between bg-card p-4 rounded-3xl border-2 border-border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
            👨‍🍳
          </div>
          <div>
            <h2 className="font-display font-bold text-lg leading-none">{username}</h2>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Level {level}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-2xl border-2 border-accent/20">
          <Star className="text-accent fill-accent" size={20} />
          <span className="font-black text-accent-foreground">{coins}</span>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center space-y-6 py-4">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <img src={logoImg} alt="Foodimals" className="w-48 h-48 mx-auto object-contain drop-shadow-2xl" />
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-display text-primary drop-shadow-sm">Foodimals</h1>
          <p className="text-lg font-medium text-muted-foreground">Guess the hybrid. Collect them all.</p>
        </div>

        <ShinyButton 
          size="xl" 
          className="w-full shadow-juicy-primary animate-pulse"
          onClick={() => setLocation('/play')}
        >
          PLAY NOW
        </ShinyButton>
      </section>

      {/* Daily Challenge Card */}
      <section className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-2 border-secondary/20 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
        
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="text-secondary fill-secondary" />
              <h3 className="font-display text-xl text-secondary-foreground">Daily Challenge</h3>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-4">Guess 3 Rare Foodimals in a row!</p>
            <ShinyButton variant="secondary" size="sm">Start Challenge</ShinyButton>
          </div>
          <div className="text-4xl">🎁</div>
        </div>
      </section>

      {/* Leaderboard Teaser */}
      <section className="bg-card border-2 border-border rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="text-accent fill-accent" />
          <h3 className="font-display text-xl">Top Players</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="font-black text-muted-foreground/50">#{i}</span>
                <span className="font-bold">Player{i}</span>
              </div>
              <span className="font-mono text-sm text-muted-foreground">{1000 - (i * 50)} XP</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
