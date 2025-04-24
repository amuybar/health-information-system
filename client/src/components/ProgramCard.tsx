import { Program } from "../types";
import { Link } from "react-router-dom";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{program.name}</h2>
      <p className="text-gray-600 mb-4 line-clamp-2">{program.description}</p>
      <div className="flex justify-between items-center">
        
        <Link
          to={`/programs/${program.id}`}
          className="bg-gray-200
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
        border-outset"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}