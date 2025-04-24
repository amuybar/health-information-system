import api from "./api";
import { Client, ClientProgram, Enrollment, EnrollmentCreate } from "../types";

export const enrollClient = async (data: EnrollmentCreate) => {
  const res = await api.post<Enrollment>("/enrollments", data);
  return res.data;
};

export const getEnrollments = async () => {
  const res = await api.get<Enrollment[]>("/enrollments");
  return res.data;
};


export const getClientsInProgram = async (programId: string) => {
  const res = await api.get<Client[]>(`/enrollments/programs/${programId}/clients`);
  return res.data;
}


export const getProgramForClients = async (clientId: string) => {
  const res = await api.get<ClientProgram[]>(`/enrollments/clients/${clientId}/programs`);
  return res.data;
}
