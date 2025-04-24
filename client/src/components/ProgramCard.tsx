import { Program } from "../types";
import { Link } from "react-router-dom";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{program.name}</h2>
      <p className="text-gray-600 mb-4 line-clamp-2">{program.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {program.clients?.length || 0} clients
        </span>
        <Link
          to={`/programs/${program.id}`}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}