// Theme Toggle
'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/imports';

export const ThemeToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button> & { className?: string }
>(({ className, ...props }, ref) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      ref={ref}
      variant="ghost"
      type="button"
      size="icon"
      className={cn('hover:text-primary w-auto cursor-pointer', className)}
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      {...props}
    >
      <SunIcon className="text-secondary hover:text-primary size-4! md:size-5! dark:hidden" />
      <MoonIcon className="text-secondary hover:text-primary hidden size-4! md:size-5! dark:block" />
    </Button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
