interface InputProps {
	type?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	id?: string;
	autoComplete?: string;
}
function Input({
	type = "text",
	placeholder,
	value,
	onChange,
	required,
	id,
	autoComplete,
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      className="w-full h-8.75 rounded-full border border-neutral-300 bg-neutral-0 text-sm text-violet-900
        px-5 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-neutral-400 placeholder:font-normal"
		/>
	);
}

export default Input;
