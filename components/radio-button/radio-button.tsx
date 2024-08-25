import { InputHTMLAttributes } from 'react';
import '@rick-and-morty-ch/components/radio-button/radio-button.style.scss';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  label: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  containerClassName = '',
  label,
  name,
  ...rest
}) => {
  return (
    <label className={`custom-radio ${containerClassName}`}>
      <input type="radio" className="custom-radio__input" name={name} {...rest} />
      <span className="custom-radio__circle"></span>
      {label}
    </label>
  );
};
