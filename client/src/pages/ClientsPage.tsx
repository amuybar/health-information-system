
import { useEffect, useState } from "react";
import { Client } from "../types";
import { getClients } from "../services/clientService";
import ClientCard from "../components/ClientCard";


export default function Clients() {
    const [clients, setClients] = useState<Client[]>([]);
  
    useEffect(() => {
      getClients().then(setClients);
    }, []);
  
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Registered Clients</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </div>
    );
  }