import { Client } from "../types";

export default function ClientCard({ client }: { client: Client }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md">
      <h2 className="text-lg font-semibold">{client.full_name}</h2>
      <p>Email: {client.email}</p>
      <p>Age: {client.age}</p>
      <p>Gender: {client.gender}</p>
    </div>
  );
}