// SEO

import { Metadata } from 'next';

export type Page = 'home' | 'compare' | 'about';

export const PROJECT_NAME = 'StackSync';
export const PROJECT_TITLE = 'StackSync - Check & Sync Your Tech Stack Versions';

export const META_DATA: Metadata = {
  title: PROJECT_TITLE,
  description:
    'Easily check if npm packages, frameworks, and libraries are compatible with different versions of React, Next.js, Tailwind, and more using StackSync.',
  icons: { icon: '/favicon.ico' },
  keywords: [
    'package compatibility checker',
    'npm package version checker',
    'framework compatibility tool',
    'React compatibility check',
    'Next.js version support',
    'Tailwind CSS compatibility',
    'check package compatibility',
    'tech stack version checker',
    'module support analysis',
    'frontend framework compatibility',
    'backend package compatibility',
    'version sync tool',
    'stack synchronization checker',
    'dependency version checker',
    'software stack compatibility',
    'library support checker',
    'React and Tailwind compatibility',
    'best package compatibility checker',
    'latest npm package versions',
  ],
  authors: [{ name: 'Hardik Gohil' }],
  openGraph: {
    title: PROJECT_TITLE,
    description:
      'Ensure smooth project development by checking npm package and framework compatibility across different versions using StackSync.',
    type: 'website',
    siteName: PROJECT_NAME,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/stacksync.jpg`,
        width: 1200,
        height: 630,
        alt: PROJECT_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PROJECT_TITLE,
    description:
      'StackSync is an open-source tool for checking package compatibility with React, Next.js, Tailwind CSS, and other frameworks.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/stacksync.jpg`,
        alt: PROJECT_TITLE,
      },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_VERIFICATION_GOOGLE,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export const getMetaData = (page: Page) => {
  const metaData: Record<Page, Metadata> = {
    home: META_DATA,
    compare: {
      ...META_DATA,
      title: 'Compare Packages | StackSync - Check & Sync Your Tech Stack Versions',
      description:
        'Compare npm packages and framework versions to ensure compatibility with React, Next.js, Tailwind CSS, and more. Optimize your software stack with StackSync.',
    },
    about: {
      title: 'About | StackSync - Check & Sync Your Tech Stack Versions',
      description:
        'StackSync is an open-source tool designed to help developers check package compatibility with different framework versions. Learn more about how it works.',
    },
  };

  return metaData[page];
};
