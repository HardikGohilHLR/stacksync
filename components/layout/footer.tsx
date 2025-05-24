// Footer
import React from 'react';
import Link from 'next/link';
import { Github, Heart, TwitterIcon } from 'lucide-react';

export const Footer = () => {
  return (
    <>
      <footer className="border-t py-10 md:py-16">
        <div className="container">
          <div className="text-secondary flex items-start justify-between gap-10 max-md:flex-col">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xl font-semibold">StackSync</span>
              </div>

              <p className="text-base">
                Made with <Heart className="text-primary inline-block h-4 w-4" /> by{' '}
                <Link href="https://hardikgohilhlr.tech" className="hover:text-primary transition duration-150">
                  <strong>Hardik Gohil</strong>
                </Link>
              </p>

              <ul className="mt-3 flex flex-col gap-4">
                <li>
                  <Link
                    href="https://x.com/GohilHardy"
                    className="hover:text-primary flex items-center gap-2 text-sm font-medium transition duration-150"
                  >
                    <TwitterIcon className="h-5 w-5" />X (Twitter)
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/HardikGohilHLR"
                    className="hover:text-primary flex items-center gap-2 text-sm font-medium transition duration-150"
                  >
                    <Github className="h-5 w-5" />
                    Source Code
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex gap-18">
              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Quick Links:</p>

                <ul className="flex flex-col gap-2">
                  <li>
                    <Link href="/compare" className="hover:text-primary text-sm font-medium transition duration-150">
                      Compare Package
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/HardikGohilHLR/stacksync"
                      className="hover:text-primary text-sm font-medium transition duration-150"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/HardikGohilHLR/stacksync/blob/main/LICENSE.md"
                      target="_blank"
                      className="hover:text-primary text-sm font-medium transition duration-150"
                    >
                      License
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/HardikGohilHLR/stacksync"
                      target="_blank"
                      className="hover:text-primary text-sm font-medium transition duration-150"
                    >
                      Contribute
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Other Products:</p>

                <ul className="flex flex-col gap-2">
                  <li>
                    <Link
                      href="https://startupslab.site"
                      target="_blank"
                      rel="dofollow"
                      className="hover:text-primary text-sm font-medium transition duration-150"
                    >
                      Startups Lab
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://letter-lens.netlify.app"
                      target="_blank"
                      className="hover:text-primary text-sm font-medium transition duration-150"
                    >
                      LetterLens
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://logar-app.netlify.app"
                      target="_blank"
                      className="hover:text-primary text-sm font-medium transition duration-150"
                    >
                      Logar
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
