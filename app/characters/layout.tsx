import { Header } from '@rick-and-morty-ch/components/header/header';

export default function CharactersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-dvh w-full flex-col gap-4 px-4 sm:px-6 lg:px-8">
      <Header />
      {children}
    </main>
  );
}
