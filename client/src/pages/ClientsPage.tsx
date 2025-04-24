import { useEffect, useState } from "react";
import { Client } from "../types";
import { getClients } from "../services/clientService";
import ClientCard from "../components/ClientCard";
import { Link } from "react-router-dom";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    getClients()
      .then((data) => {
        setClients(data);
        setFilteredClients(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load clients");
        setLoading(false);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter(
        (client) =>
          client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.id.toString().includes(searchTerm) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    }
  }, [searchTerm, clients]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Clients</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search clients by name, ID or email"
            className="w-full p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="border p-4 rounded bg-white animate-pulse h-32"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-4 border rounded bg-white">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => {
                setError(null);
                setLoading(true);
                getClients()
                  .then((data) => {
                    setClients(data);
                    setFilteredClients(data);
                    setLoading(false);
                  })
                  .catch((err) => {
                    setError("Failed to load clients");
                    console.error(err);
                    setLoading(false);
                  });
              }}
              className="mt-2 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <Link 
                  to={`/clients/${client.id}`} 
                  key={client.id}
                  className="border rounded bg-white p-4 hover:shadow-lg transition-shadow"
                >
                  <ClientCard client={client} />
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center p-4 border rounded bg-white">
                <p>No clients found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}