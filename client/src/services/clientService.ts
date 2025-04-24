import api from "./api";
import { Client, ClientCreate } from "../types";

export const createClient = async (client: ClientCreate) => {
  const res = await api.post<Client>("/clients", client);
  return res.data;
};

export const getClients = async () => {
  const res = await api.get<Client[]>("/clients");
  return res.data;
};

export const getClient = async (id: string) => {
  const res = await api.get<Client>(`/clients/${id}`);
  return res.data;
};

export const getClientsByProgram = async (programId: string) => {
  const res = await api.get<Client[]>(`/programs/${programId}/clients`);
  return res.data;
}


export const updateClient = async (id: string, client: Client) => {
  const res = await api.put<Client>(`/clients/${id}`, client);
  return res.data;
}