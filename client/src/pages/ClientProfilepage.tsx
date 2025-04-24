import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Client } from "../types";
import { getClient } from "../services/clientService";

export default function ClientProfile() {
    const { id } = useParams();
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const printRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLoading(true);
        getClient(id as string)
            .then((data) => {
                setClient(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load client profile");
                setLoading(false);
                console.error(err);
            });
    }, [id]);

    const handlePrint = () => {
        if (!printRef.current) return;
        const printContents = printRef.current.innerHTML;
        const printWindow = window.open("", "_blank", "width=800,height=600");
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Client Profile</title>
                        <style>
                            body { font-family: sans-serif; padding: 24px; background: #fff; }
                            h1, h2 { margin-top: 0; }
                            .border { border: 1px solid #e5e7eb; }
                            .rounded { border-radius: 0.5rem; }
                            .p-6 { padding: 1.5rem; }
                            .mb-4 { margin-bottom: 1rem; }
                            .mb-2 { margin-bottom: 0.5rem; }
                            .font-bold { font-weight: bold; }
                            .font-medium { font-weight: 500; }
                            .text-xl { font-size: 1.25rem; }
                            .text-2xl { font-size: 1.5rem; }
                            .text-sm { font-size: 0.875rem; }
                            .text-gray-600 { color: #4b5563; }
                            .bg-gray-50 { background: #f9fafb; }
                            .bg-white { background: #fff; }
                            .p-3 { padding: 0.75rem; }
                            .grid { display: grid; }
                            .gap-4 { gap: 1rem; }
                            .border-b { border-bottom: 1px solid #e5e7eb; }
                        </style>
                    </head>
                    <body>${printContents}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-3xl mx-auto bg-white border rounded p-6 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-4 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4 w-full"></div>
                </div>
            </div>
        );
    }

    if (error || !client) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-3xl mx-auto bg-white border rounded p-6 text-center">
                    <p className="text-red-500 mb-4">{error || "Client not found"}</p>
                    <Link to="/clients" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                        Back to Clients
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-3xl mx-auto">
                <div className="mb-4 flex items-center justify-between">
                    <Link to="/clients" className="text-blue-500 hover:underline">
                        &larr; Back to Clients
                    </Link>
                    <button
                        onClick={handlePrint}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Print
                    </button>
                </div>
                <div ref={printRef}>
                    <div className="bg-white border rounded p-6">
                        <h1 className="text-2xl font-bold mb-4">{client.full_name}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <p><span className="font-medium">ID:</span> {client.id}</p>
                                <p><span className="font-medium">Email:</span> {client.email}</p>
                                <p><span className="font-medium">Phone:</span> {client.phone_number}</p>
                            </div>
                            <div>
                                <p><span className="font-medium">Status:</span> {client.status}</p>
                                <p><span className="font-medium">Registration Date:</span> {new Date(client.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">Enrolled Programs</h2>
                            {client.enrolled_programs && client.enrolled_programs.length > 0 ? (
                                <div className="border rounded">
                                    {client.enrolled_programs.map((program, index) => (
                                        <div 
                                            key={program.id} 
                                            className={`p-3 ${index !== (client.enrolled_programs?.length ?? 0) - 1 ? 'border-b' : ''}`}
                                        >
                                            <p className="font-medium">{program.name}</p>
                                            <p className="text-sm text-gray-600">
                                                {program.startDate && new Date(program.startDate).toLocaleDateString()} - 
                                                {program.endDate ? new Date(program.endDate).toLocaleDateString() : 'Ongoing'}
                                            </p>
                                            {program.description && <p className="text-sm mt-1">{program.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">Not enrolled in any programs</p>
                            )}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-2">Notes</h2>
                            <p className="border p-3 rounded bg-gray-50">
                                {client.notes || "No notes available"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}