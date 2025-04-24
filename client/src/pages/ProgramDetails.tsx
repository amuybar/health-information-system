import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Program, Client } from "../types";
import { getProgramById, deleteProgram } from "../services/proramService";
import { getClientsByProgram } from "../services/clientService";
import ClientCard from "../components/ClientCard";

export default function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const programData = await getProgramById(id!);
        const clientsData = await getClientsByProgram(id!);
        setProgram(programData);
        setClients(clientsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load program details");
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await deleteProgram(id!);
        navigate("/programs");
      } catch (err) {
        setError("Failed to delete program");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto p-4 border rounded-lg text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto p-4 border rounded-lg text-center">
          <p>Program not found</p>
          <Link
            to="/programs"
            className="mt-4 inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">{program.name}</h1>
            <p className="text-gray-600 mt-2">{program.description}</p>
          </div>
          <div className="flex space-x-2">
            <Link
              to={`/programs/${program.id}/edit`}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mb-8 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Program Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span className="font-medium">Start Date:</span> {program.startDate}</p>
            </div>
            <div>
              <p><span className="font-medium">End Date:</span> {program.endDate || 'Ongoing'}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Enrolled Clients ({clients.length})</h2>
            <Link
              to={`/programs/${program.id}/enroll`}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Enroll Client
            </Link>
          </div>

          {clients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clients.map((client) => (
                <ClientCard key={client.id} client={client}  />
              ))}
            </div>
          ) : (
            <div className="p-4 border rounded-lg text-center">
              <p>No clients enrolled in this program</p>
            </div>
          )}
        </div>

        <Link
          to="/programs"
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Back to Programs
        </Link>
      </div>
    </div>
  );
}