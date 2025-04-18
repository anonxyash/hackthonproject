import Header from '../components/Header';
import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import CustomCursor from '../components/CustomCursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web Agency',
  description: 'Professional web development and design services',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomCursor />
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}