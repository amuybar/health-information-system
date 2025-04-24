import { useEffect, useState } from "react";
import { Client, Program, EnrollmentCreate } from "../types";
import { getClients } from "../services/clientService";
import { enrollClient } from "../services/enrollmentService";
import Button from "../components/Button";
import { getPrograms } from "../services/proramService";

export default function Enroll() {
  const [clients, setClients] = useState<Client[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [formData, setFormData] = useState<EnrollmentCreate>({
    client_id: "",
    program_id: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const [clientsData, programsData] = await Promise.all([
          getClients(),
          getPrograms()
        ]);
        setClients(clientsData);
        setPrograms(programsData);
      } catch (err) {
        setError("Failed to load data. Please refresh the page.");
        console.error(err)
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_id || !formData.program_id) {
      setError("Please select both a client and a program.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    setSuccess(false);
    
    try {
      await enrollClient(formData);
      setSuccess(true);
      setFormData({ client_id: "", program_id: "" });
    } catch (err) {
      setError("Failed to enroll client. Please try again.");
      console.error(err)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-xl mx-auto font-mono text-black">
        <div className="border border-black p-4 text-center">
          Loading data...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto font-mono text-black">
      <h1 className="text-2xl font-bold mb-4">Enroll Client Into Program</h1>
      
      {error && (
        <div className="border border-black p-2 mb-4 bg-black text-white">
          Error: {error}
        </div>
      )}
      
      {success && (
        <div className="border border-black p-2 mb-4 bg-green-100">
          ✓ Client enrolled successfully.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-black p-4">
          <h2 className="text-lg font-bold mb-3">1. Select Client</h2>
          <select
            name="client_id"
            value={formData.client_id}
            onChange={handleChange}
            className="w-full border border-black px-3 py-2 bg-white"
           
          >
            <option value="">-- Select a Client --</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.full_name} ({client.email})
              </option>
            ))}
          </select>
          {clients.length === 0 && (
            <div className="border border-black p-2 mt-2 text-center bg-gray-100">
              No clients available
            </div>
          )}
        </div>

        <div className="border border-black p-4">
          <h2 className="text-lg font-bold mb-3">2. Select Program</h2>
          <select
            name="program_id"
            value={formData.program_id}
            onChange={handleChange}
            className="w-full border border-black px-3 py-2 bg-white"
            
          >
            <option value="">-- Select a Program --</option>
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
          {programs.length === 0 && (
            <div className="border border-black p-2 mt-2 text-center bg-gray-100">
              No programs available
            </div>
          )}
        </div>

        <div className="text-center">
          <Button 
            type="submit" 
            text={isSubmitting ? "Enrolling..." : "Enroll Client"} 
            disabled={isSubmitting || !formData.client_id || !formData.program_id}
            
          />
        </div>
      </form>
    </div>
  );
}