// Home
import React from 'react';
import Link from 'next/link';

import { Search, Star, TrendingUp, Zap, Code2, GitFork, Github } from 'lucide-react';

import { buttonVariants } from '@/components/imports';

const features = [
  {
    icon: <Search className="text-secondary h-8 w-8" />,
    title: 'Smart Package Search',
    description: 'Instantly search and find any npm package with detailed information and version history.',
  },
  {
    icon: <Star className="text-secondary h-8 w-8" />,
    title: 'Compatibility Check',
    description: 'Advanced analysis of package dependencies to ensure smooth integration.',
  },
  {
    icon: <TrendingUp className="text-secondary h-8 w-8" />,
    title: 'Popular Stacks',
    description: 'Discover and use pre-configured tech stacks from the community.',
  },
  {
    icon: <Zap className="text-secondary h-8 w-8" />,
    title: 'Real-time Analysis',
    description: 'Get instant feedback on package compatibility and potential issues.',
  },
];

export const Home = () => {
  return (
    <>
      <div className="pt-48 pb-20 md:pb-24">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1">
              <Star className="h-4 w-4" />
              <span className="text-secondary text-sm font-medium max-sm:text-[12px]">Open Source Package Compatibility Tool</span>
            </div>

            <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-secondary text-3xl leading-10 font-bold md:text-4xl lg:text-5xl lg:leading-18 xl:text-6xl">
                  Ensure Your Dependencies Work Together
                </h1>

                <p className="text-secondary text-base">
                  Check compatibility between npm packages, discover popular tech stacks, and build with confidence
                  using our advanced dependency analysis.
                </p>
              </div>

              <div className="flex w-full items-center justify-center flex-wrap gap-4">
                <Link href="/compare" className={buttonVariants({ variant: 'default', size: 'lg' })}>
                  Check Compatibility
                </Link>

                <Link
                  href="https://github.com/HardikGohilHLR/StackSync"
                  className={buttonVariants({ variant: 'outline', size: 'lg' })}
                >
                  <Github />
                  Star on GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="mb-12 flex flex-col gap-4 text-center md:mb-20">
            <h2 className="text-secondary text-3xl font-bold md:text-4xl">Powerful Features</h2>
            <p className="text-secondary text-base">
              Everything you need to manage your package dependencies and ensure smooth integration.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features?.map((feature) => (
              <div className="group rounded-2xl border px-6 py-8 text-center hover:-translate-y-1" key={feature?.title}>
                <div className="mb-4 inline-flex rounded-xl p-4 md:mb-6">{feature?.icon}</div>
                <h3 className="text-secondary mb-3 text-xl font-semibold md:mb-4">{feature?.title}</h3>
                <p className="text-secondary text-base">{feature?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributing Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="flex flex-col gap-10 text-center">
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
              <h2 className="text-secondary text-3xl font-bold md:text-4xl">Join Our Community</h2>
              <p className="text-secondary text-base">
                Help us make package compatibility checking better for everyone. Join our growing open-source community
                and contribute to the future of dependency management.
              </p>
            </div>

            <div className="flex justify-center gap-6 pt-4">
              <Link
                href="https://github.com/HardikGohilHLR/stacksync/issues"
                className={buttonVariants({ variant: 'secondary', size: 'lg' })}
              >
                <Code2 className="mr-2 h-5 w-5 text-white" />
                Report Issues
              </Link>

              <Link
                href="https://github.com/HardikGohilHLR/stacksync/fork"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                <GitFork className="text-secondary mr-2 h-5 w-5" />
                Fork Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
