// Navbar
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { GithubIcon } from 'lucide-react';

import { ThemeToggle } from '@/components/imports';
import { StackSyncIcon } from '@/assets/icons/StackSyncIcon';

export const Navbar = () => {
  const pathName = usePathname();

  return (
    <header className="fixed w-full py-6">
      <div className="container">
        <nav className="dark:bg-background flex items-center justify-between rounded-2xl border bg-white px-4 py-2 md:px-8">
          <Link href="/" className="text-base font-bold">
            <StackSyncIcon />
          </Link>

          <div className="flex items-center gap-6 md:gap-8">
            <Link
              href="/compare"
              className={clsx(
                'hover:text-primary text-secondary text-sm font-medium transition duration-150',
                pathName === '/compare' && 'text-primary'
              )}
            >
              Compare
            </Link>

            <div className="flex items-center gap-3 md:gap-4">
              <Link href="https://github.com/HardikGohilHLR/stacksync" target="_blank">
                <GithubIcon className="text-secondary hover:text-primary size-4 md:size-5" />
              </Link>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
