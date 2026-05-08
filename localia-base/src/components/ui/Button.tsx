interface ButtonProps {
    text: string;
    bgColor: string;
    textColor: string;
    size: string;
    textSize?: string;
}

function Button({
    text,
    bgColor,
    textColor,
    size,
    textSize = "text-base"
}: ButtonProps) {

    return (
        <button
            className={`
                ${bgColor}
                ${textColor}
                ${size}
                ${textSize}
                rounded-lg
                font-medium
            `}
        >
            {text}
        </button>
    );
}

export default Button;