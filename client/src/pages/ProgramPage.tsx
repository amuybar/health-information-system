import { useEffect, useState } from "react";
import { Program } from "../types";
import ProgramCard from "../components/ProgramCard";
import { Link } from "react-router-dom";
import { getPrograms } from "../services/proramService";

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = () => {
    setLoading(true);
    getPrograms()
      .then((data) => {
        setPrograms(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load programs. Please try again.");
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-6">Health Programs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-4 border rounded-lg animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-6">Health Programs</h1>
        <div className="p-4 border rounded-lg text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchPrograms}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Health Programs</h1>
        <Link 
          to="/programs/add"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Program
        </Link>
      </div>

      {programs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      ) : (
        <div className="p-4 border rounded-lg text-center">
          <p>No programs found</p>
        </div>
      )}
    </div>
  );
}