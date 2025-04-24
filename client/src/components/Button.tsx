interface Props {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({ text, onClick, type = "button",disabled }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        bg-gray-200
        border-2 border-white
        text-black
        px-5 py-1.5
        rounded
        font-sans
        text-[15px]
        shadow-inner
        active:border-gray-400
        active:shadow-none
        cursor-pointer
        font-normal
        outline-none
        border-outset
      "
      style={{
        fontFamily: "Tahoma, Geneva, sans-serif",
        borderStyle: "outset",
      }}
    >
      {text}
    </button>
  );
}