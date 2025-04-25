import api from "./api";
import { Client, ClientProgram, Enrollment, EnrollmentCreate } from "../types";

// COS: Enroll a client into a program
// Sends a POST request to create a new enrollment record
export const enrollClient = async (data: EnrollmentCreate) => {
  const res = await api.post<Enrollment>("/enrollments", data);
  return res.data;
};

// COS: Retrieve all enrollments
// Sends a GET request to fetch all enrollment records
export const getEnrollments = async () => {
  const res = await api.get<Enrollment[]>("/enrollments");
  return res.data;
};

// COS: Retrieve all clients in a specific program
// Sends a GET request to fetch all clients enrolled in a given program
export const getClientsInProgram = async (programId: string) => {
  const res = await api.get<Client[]>(`/enrollments/programs/${programId}/clients`);
  return res.data;
};

// COS: Retrieve all programs for a specific client
// Sends a GET request to fetch all programs a client is enrolled in
export const getProgramForClients = async (clientId: string) => {
  const res = await api.get<ClientProgram[]>(`/enrollments/clients/${clientId}/programs`);
  return res.data;
};