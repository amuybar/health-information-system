interface Props {
  label: string;
  type: string;
  name: string;
  value: string | number;
  placeholder?:string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ label, type, name, value, onChange,onBlur,placeholder }: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-bold text-gray-800 tracking-wide uppercase">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border border-gray-400 px-2 py-1 rounded-none bg-gray-100 text-gray-900 shadow-inner focus:outline-none focus:border-black"
      />
    </div>
  );
}