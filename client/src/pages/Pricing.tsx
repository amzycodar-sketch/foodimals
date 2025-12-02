import { ShinyButton } from '@/components/ui/shiny-button';
import { Check, Crown, Zap, Globe } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: "Scout",
      price: "Free",
      features: [
        "Access to 50 Common Foodimals",
        "Basic Leaderboard Access",
        "Daily Challenges",
        "Standard Support"
      ],
      cta: "Current Plan",
      variant: "outline" as const
    },
    {
      name: "Pro Hunter",
      price: "$9.99",
      period: "/month",
      featured: true,
      features: [
        "Unlock All 500+ Foodimals",
        "Legendary Rarity Access",
        "AI Generation Tool (Beta)",
        "Ad-Free Experience",
        "Gold Profile Badge"
      ],
      cta: "Upgrade Now",
      variant: "primary" as const
    },
    {
      name: "Team",
      price: "$29.99",
      period: "/month",
      features: [
        "Everything in Pro",
        "Clan/Guild Features",
        "Private Tournaments",
        "API Access",
        "Dedicated Support"
      ],
      cta: "Contact Sales",
      variant: "outline" as const
    }
  ];

  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
          Upgrade your <span className="text-gradient">Clearance.</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Join the elite ranks of Foodimal Hunters. Unlock exclusive species and advanced tracking tools.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div 
            key={i}
            className={`
              relative p-8 rounded-3xl border flex flex-col gap-6
              ${plan.featured 
                ? 'bg-card shadow-2xl border-primary/50 md:-mt-8 md:mb-8 z-10' 
                : 'bg-background/50 border-border shadow-sm'}
            `}
          >
            {plan.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                Most Popular
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-muted-foreground uppercase tracking-widest mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
            </div>

            <div className="space-y-3 flex-1">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-start gap-3 text-sm">
                  <div className={`mt-0.5 rounded-full p-0.5 ${plan.featured ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-foreground/80 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <ShinyButton 
              variant={plan.variant} 
              className="w-full"
              size={plan.featured ? 'lg' : 'md'}
            >
              {plan.cta}
            </ShinyButton>
          </div>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-bold">Enterprise Licensing</h3>
          <p className="text-muted-foreground">Need to deploy Foodimals for educational institutions or large events?</p>
        </div>
        <ShinyButton variant="secondary">Contact Enterprise</ShinyButton>
      </div>
    </div>
  );
}
