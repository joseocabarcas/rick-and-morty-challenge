import '@rick-and-morty-ch/components/input-search/input-search.style.scss';
import Image from 'next/image';
import { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputSearch: React.FC<InputSearchProps> = ({
  containerClassName = '',
  value,
  placeholder = 'Search...',
  onChange,
  ...rest
}) => {
  return (
    <div className={`search-input ${containerClassName}`}>
      <input
        className="search-input__field"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
      <Image
        src="/icons/search.svg"
        alt="Search icon"
        width={20}
        height={20}
        className="search-input__icon"
      />
    </div>
  );
};
