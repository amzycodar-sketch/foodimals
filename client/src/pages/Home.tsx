import { useState } from 'react';
import { useLocation } from 'wouter';
import { useGameStore } from '@/store/gameStore';
import { ShinyButton } from '@/components/ui/shiny-button';
import { motion } from 'framer-motion';
import { Trophy, Star, Flame, ArrowRight, Zap, Globe, Brain } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

        <div className="space-y-8 w-full max-w-md px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-7xl font-display font-bold tracking-tight text-foreground mb-2">
              Foodimals
            </h1>
            <p className="text-xl text-muted-foreground font-medium">
              The future of hybrid discovery.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card/50 backdrop-blur-md border border-border p-8 rounded-3xl shadow-2xl"
          >
            <div className="space-y-4">
              <div className="text-left space-y-1">
                <label className="text-sm font-semibold text-foreground pl-1">Enter Credentials</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Agent Name"
                  className="w-full h-12 px-4 rounded-xl bg-background border border-border text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              
              <ShinyButton 
                className="w-full" 
                size="lg"
                onClick={handleStart}
                disabled={!nameInput.trim()}
              >
                Initialize Session <ArrowRight size={18} />
              </ShinyButton>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-12">
      {/* Dashboard Header */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between bg-card p-6 rounded-3xl border border-border shadow-sm gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg shadow-primary/20">
            👨‍💻
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl leading-none mb-1">{username}</h2>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md uppercase text-xs tracking-wider">Pro Member</span>
              <span>•</span>
              <span>Level {level} Scout</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
           <div className="flex-1 md:flex-none flex items-center gap-3 bg-background border border-border px-5 py-3 rounded-xl">
              <Star className="text-amber-400 fill-amber-400" size={20} />
              <div>
                <div className="text-xs text-muted-foreground font-bold uppercase">Credits</div>
                <div className="font-mono font-bold text-lg leading-none">{coins.toLocaleString()}</div>
              </div>
           </div>
           <ShinyButton size="sm" variant="outline">Top Up</ShinyButton>
        </div>
      </motion.header>

      {/* Hero / CTA Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight leading-tight">
            Discover the <span className="text-gradient">Unknown.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
            Join millions of players classifying the world's most elusive hybrid species. Powered by advanced AI generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <ShinyButton 
              size="xl" 
              className="shadow-xl shadow-primary/20"
              onClick={() => setLocation('/play')}
            >
              Start Expedition
            </ShinyButton>
            <ShinyButton 
              variant="secondary" 
              size="xl"
              onClick={() => setLocation('/leaderboard')}
            >
              View Leaderboard
            </ShinyButton>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl -z-10" />
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 rounded-[2.5rem] shadow-2xl"
          >
             <img src={logoImg} alt="Foodimals" className="w-full h-auto rounded-2xl shadow-inner" />
             <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Featured Hybrid</div>
                  <div className="font-display font-bold text-xl">BurgerBear</div>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Rare</div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid sm:grid-cols-3 gap-6">
        {[
          { icon: Brain, title: "AI Generated", desc: "Infinite procedural combinations." },
          { icon: Globe, title: "Global Network", desc: "Compete with agents worldwide." },
          { icon: Zap, title: "Instant Sync", desc: "Cross-platform progression." },
        ].map((feature, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4 text-foreground">
              <feature.icon size={24} />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Daily Challenge Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-foreground text-background p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary to-accent opacity-20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="text-orange-500 fill-orange-500" />
              <span className="font-bold uppercase tracking-widest text-sm opacity-80">Daily Ops</span>
            </div>
            <h3 className="font-display font-bold text-3xl md:text-4xl mb-2">The Golden Trio</h3>
            <p className="text-background/70 max-w-md text-lg">
              Identify 3 Rare class entities consecutively to unlock the exclusive 'Golden Glaze' skin.
            </p>
          </div>
          <ShinyButton variant="glass" size="lg" className="shrink-0">
            Accept Mission
          </ShinyButton>
        </div>
      </section>

    </div>
  );
}
