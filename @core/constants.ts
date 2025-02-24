// Constants
import { IPackageCombination } from '@/@core/interfaces';

export const popularCombinations: IPackageCombination[] = [
  {
    name: 'Modern React Stack',
    description: 'Popular combination for modern React applications',
    packages: [
      { name: 'react', version: '18.2.0' },
      { name: 'react-dom', version: '18.2.0' },
      { name: 'typescript', version: '5.2.2' },
      { name: 'vite', version: '5.0.0' },
    ],
    tags: ['react', 'typescript', 'frontend'],
  },
  {
    name: 'Next.js Full Stack',
    description: 'Full-stack development with Next.js',
    packages: [
      { name: 'next', version: '14.0.0' },
      { name: 'react', version: '18.2.0' },
      { name: 'react-dom', version: '18.2.0' },
      { name: 'typescript', version: '5.2.2' },
    ],
    tags: ['next.js', 'react', 'full-stack'],
  },
  {
    name: 'React Native Mobile',
    description: 'Mobile app development with React Native',
    packages: [
      { name: 'react-native', version: '0.72.0' },
      { name: 'react', version: '18.2.0' },
      { name: 'typescript', version: '5.2.2' },
      { name: '@react-navigation/native', version: '6.1.0' },
    ],
    tags: ['react-native', 'mobile'],
  },
  {
    name: 'State Management',
    description: 'Popular state management solutions',
    packages: [
      { name: 'react', version: '18.2.0' },
      { name: 'react-dom', version: '18.2.0' },
      { name: '@reduxjs/toolkit', version: '2.0.0' },
      { name: 'react-redux', version: '9.0.0' },
    ],
    tags: ['redux', 'state-management'],
  },
  {
    name: 'Testing Suite',
    description: 'Comprehensive testing setup',
    packages: [
      { name: 'jest', version: '29.7.0' },
      { name: '@testing-library/react', version: '14.1.0' },
      { name: '@testing-library/jest-dom', version: '6.1.0' },
      { name: 'vitest', version: '1.0.0' },
    ],
    tags: ['testing'],
  },
  {
    name: 'UI Component Library',
    description: 'Popular UI libraries for React',
    packages: [
      { name: 'react', version: '18.2.0' },
      { name: 'react-dom', version: '18.2.0' },
      { name: '@mui/material', version: '5.14.0' },
      { name: '@emotion/react', version: '11.11.0' },
      { name: '@emotion/styled', version: '11.11.0' },
    ],
    tags: ['ui', 'material-ui'],
  },
];
