'use client';

import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);


import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UHI Skill Share',
  description: 'Student skill-sharing platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
