import {
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  memo,
} from 'react';

type InputBaseProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface CustomInputProps {
  onChange: (value: string) => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
  isLoading?: boolean;
  className?: string;
}

type TextInputProps = Omit<InputBaseProps, 'onChange' | 'className' | 'prefix'> & CustomInputProps;

const generateInputClasses = (hasPrefix: boolean, hasSuffixOrLoading: boolean, className = '') => {
  const paddingClasses = `${hasPrefix ? 'pl-12' : 'pl-4'} ${hasSuffixOrLoading ? 'pr-10' : 'pr-4'}`;

  return `
    h-12 
    w-full 
    rounded-xl 
    bg-input
    ${paddingClasses}
    text-black 
    placeholder-gray-500 
    border-none 
    focus:outline-none 
    focus:ring-2 
    focus:ring-accent
    focus:caret-accent
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ onChange, prefix, suffix, isLoading = false, className = '', ...restProps }, ref) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => onChange(e.target.value);

    const hasPrefix = !!prefix;
    const hasSuffixOrLoading = !!(suffix || isLoading);
    const inputClasses = generateInputClasses(hasPrefix, hasSuffixOrLoading, className);

    return (
      <div className="relative">
        {prefix && (
          <div className="text-secondary absolute left-4 top-1/2 -translate-y-1/2 transform">
            {prefix}
          </div>
        )}
        <input
          ref={ref}
          type="text"
          onChange={handleChange}
          className={inputClasses}
          {...restProps}
        />
        {(isLoading || suffix) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
            {isLoading ? (
              <div className="spinner-accent h-5 w-5 animate-spin rounded-full border-2" />
            ) : (
              suffix
            )}
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

const MemoizedTextInput = memo(TextInput);
MemoizedTextInput.displayName = 'MemoizedTextInput';

export default MemoizedTextInput;
