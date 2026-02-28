import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Big Feirão 2026 - Encontre seu carro ideal',
  description: 'O maior feirão de veículos da região. Centenas de carros seminovos com financiamento Banco BV e as melhores lojas.',
  keywords: 'feirao, carros, veiculos, seminovos, ofertas, automotivo, mogi guacu, banco bv, financiamento',
  icons: {
    icon: '/logo-big-feirao.png',
    apple: '/logo-icon-800.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
