import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@rick-and-morty-ch/styles/globals.css';
import Providers from '@rick-and-morty-ch/containers/shared/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rick And Morty',
  description: 'Challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-dvh w-dvw overflow-x-hidden overflow-y-scroll`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
