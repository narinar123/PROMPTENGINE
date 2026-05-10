import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GUIDESOFT TRAINING - AI-Powered Premium Learning Platform',
  description: 'Master tech skills with AI-guided personalized learning paths. 42+ industry courses from beginner to expert level. Subscription-based premium education.',
  keywords: ['AI learning', 'online courses', 'tech training', 'machine learning', 'web development', 'cloud computing', 'certification'],
  authors: [{ name: 'GUIDESOFT TRAINING' }],
  openGraph: {
    title: 'GUIDESOFT TRAINING - AI-Powered Learning Platform',
    description: 'Personalized AI-guided courses for tech professionals',
    type: 'website',
    locale: 'en_US',
    siteName: 'GUIDESOFT TRAINING',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GUIDESOFT TRAINING',
    description: 'AI-Powered Premium Learning Platform',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
