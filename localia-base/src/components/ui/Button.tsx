interface ButtonProps {
  text: string;
  bgColor: string;
  textColor: string;
  size: string;
  textSize?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

function Button({
  text,
  bgColor,
  textColor,
  size,
  textSize = "text-sm",
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${bgColor} ${textColor} ${size} ${textSize}
        h-8.75 rounded-full font-medium
        disabled:opacity-50 hover:opacity-90 transition-opacity
      `}
    >
      {text}
    </button>
  );
}

export default Button;