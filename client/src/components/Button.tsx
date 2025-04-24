interface Props {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit";
  }
  
  export default function Button({ text, onClick, type = "button" }: Props) {
    return (
      <button
        type={type}
        onClick={onClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
      >
        {text}
      </button>
    );
  }