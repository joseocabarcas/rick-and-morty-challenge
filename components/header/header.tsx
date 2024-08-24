import Image from 'next/image';

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-center gap-6 p-4">
      <Image src="/rick_morty_header.webp" alt="Logo Rick and Morty" width={400} height={200} />
      <h1 className="text-4xl font-bold">Rick and Morty</h1>
    </header>
  );
};
