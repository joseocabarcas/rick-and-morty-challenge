import Image from 'next/image';
import '@rick-and-morty-ch/components/header/header.style.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__image-container">
        <Image
          src="/rick_morty_header.webp"
          alt="Logo Rick and Morty"
          width={400}
          height={200}
          className="header__image"
          priority
        />
      </div>
      <h1 className="header__title">Rick and Morty</h1>
    </header>
  );
};
