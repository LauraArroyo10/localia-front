// interface SelectProps {
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   required?: boolean;
//   children: React.ReactNode;
// }

// function Select({
//   value,
//   onChange,
//   required,
//   children,
// }: SelectProps) {
//   return (
//     <select
//       value={value}
//       onChange={onChange}
//       required={required}
//        className="w-full h-8.75 rounded-full border border-neutral-300 bg-white text-sm text-violet-900
//         px-5 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-neutral-400 placeholder:font-normal"
   
//     >
//       {children}
//     </select>
//   );
// }

// export default Select;



import { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
  sub?: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder: string;
  options: Option[];
}

function Select({
  value,
  onChange,
  placeholder,
  options,
}: SelectProps) {

  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {

      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  return (

    <div
      ref={ref}
      className="relative w-full"
    >

      {/* SELECT BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full
          h-8.75
          rounded-full
          border
          border-neutral-300
          bg-white
          px-5
          text-sm
          text-violet-900
          flex
          items-center
          justify-between
          outline-none
          transition-all
          focus:border-violet-500
          focus:ring-1
          focus:ring-violet-500
        "
      >

        <span>
          {selectedOption
            ? selectedOption.label
            : placeholder}
        </span>

        <span className="text-neutral-400">
          ▼
        </span>

      </button>

      {/* OPTIONS */}
      {isOpen && (

        <div
          className="
            absolute
            top-14
            w-full
            overflow-hidden
            rounded-3xl
            bg-violet-50
            shadow-lg
            z-50
            max-h-60
            overflow-y-auto
          "
        >

          {options.map((option) => (

            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="
                w-full
                text-left
                px-5
                py-3
                hover:bg-neutral-200
                transition-colors
              "
            >

              <p className="text-sm font-medium text-violet-900">
                {option.label}
              </p>

              {option.sub && (
                <p className="text-xs text-neutral-500">
                  {option.sub}
                </p>
              )}

            </button>

          ))}

        </div>

      )}

    </div>

  );
}

export default Select;