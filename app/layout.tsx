import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rasen Web',
  description: 'ラセンのホームページトップ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full">
      <body className="h-full bg-slate-950 flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
