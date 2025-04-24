import { Client } from "../types";

export default function ClientCard({ client }: { client: Client }) {
  return (
    <div className="border border-gray-400 rounded p-6 bg-white shadow">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{client.full_name}</h2>
      <p className="mb-1 text-gray-700"><span className="font-semibold">Email:</span> {client.email}</p>
      <p className="mb-1 text-gray-700"><span className="font-semibold">Age:</span> {client.age}</p>
      <p className="text-gray-700"><span className="font-semibold">Gender:</span> {client.gender}</p>
    </div>
  );
}