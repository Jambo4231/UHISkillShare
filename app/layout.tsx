import './globals.css';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import AmplifyProvider from '../components/AmplifyProvider'; 

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
      <body className={nunito.className}>
        <AmplifyProvider>{children}</AmplifyProvider>
      </body>
    </html>
  );
}
