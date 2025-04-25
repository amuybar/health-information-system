import api from "./api";
import { Client, ClientCreate } from "../types";

// API endpoint constants
const CLIENTS_ENDPOINT = "/clients";

// Creates a new client
export const createClient = async (client: ClientCreate) => {
  const res = await api.post<Client>(CLIENTS_ENDPOINT, client);
  return res.data;
};

// Retrieves all clients
export const getClients = async () => {
  const res = await api.get<Client[]>(CLIENTS_ENDPOINT);
  return res.data;
};

// Retrieves a single client by ID
export const getClient = async (id: string) => {
  const res = await api.get<Client>(`${CLIENTS_ENDPOINT}/${id}`);
  return res.data;
};

// Updates an existing client by ID
export const updateClient = async (id: string, client: Client) => {
  const res = await api.put<Client>(`${CLIENTS_ENDPOINT}/${id}`, client);
  return res.data;
};