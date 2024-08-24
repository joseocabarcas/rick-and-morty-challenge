import { Header } from '@rick-and-morty-ch/components/header/header';

export default function CharactersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-dvh w-full flex-col gap-4">
      <Header />
      {children}
    </main>
  );
}
