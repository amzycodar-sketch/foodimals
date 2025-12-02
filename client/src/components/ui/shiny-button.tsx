import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ShinyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function ShinyButton({ 
  className, 
  variant = 'primary', 
  size = 'md',
  children,
  ...props 
}: ShinyButtonProps) {
  
  const variants = {
    primary: 'bg-primary text-primary-foreground shadow-juicy-primary hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground shadow-juicy-secondary hover:bg-secondary/90',
    accent: 'bg-accent text-accent-foreground shadow-[0_6px_0_0_hsl(45_95%_40%)] hover:bg-accent/90',
    destructive: 'bg-destructive text-white shadow-[0_6px_0_0_hsl(0_80%_40%)] hover:bg-destructive/90',
  };

  const sizes = {
    sm: 'h-10 px-4 text-sm rounded-xl',
    md: 'h-14 px-6 text-lg rounded-2xl',
    lg: 'h-16 px-10 text-xl rounded-3xl',
    xl: 'h-20 px-12 text-2xl rounded-[2rem]',
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 4, boxShadow: '0 0px 0 0 transparent' }}
      className={cn(
        'font-display font-bold uppercase tracking-wide transition-all active:translate-y-[6px]',
        variants[variant],
        sizes[size],
        className
      )}
      {...props as any}
    >
      {children}
    </motion.button>
  );
}
