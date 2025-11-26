import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'devblog | Notes from the lab',
  description:
    'A minimal static blog starter with infinite scrolling posts, built for Firebase Hosting.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-slate-100`}>
        <div className="flex min-h-screen flex-col lg:flex-row">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-background px-6 py-10 lg:px-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
