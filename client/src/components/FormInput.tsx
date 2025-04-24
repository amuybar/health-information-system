interface Props {
    label: string;
    type: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export default function FormInput({ label, type, name, value, onChange }: Props) {
    return (
      <div className="mb-4">
        <label className="block mb-1 font-medium">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
    );
  }