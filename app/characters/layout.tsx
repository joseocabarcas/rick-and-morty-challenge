import { Header } from "@rick-and-morty-ch/components/header/header";

export default function CharactersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-dvh w-full">
      <Header />
      {children}
    </main>
  );
}