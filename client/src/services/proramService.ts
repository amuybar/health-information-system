import api from "./api";
import { Program, ProgramCreate } from "../types";

// API endpoint constant for programs
const PROGRAMS_ENDPOINT = "/programs";

// COS: Create a new program
// Sends a POST request to create a new program record
export const createProgram = async (program: ProgramCreate) => {
  const res = await api.post<Program>(PROGRAMS_ENDPOINT, program);
  return res.data;
};

// COS: Retrieve all programs
// Sends a GET request to fetch all program records
export const getPrograms = async () => {
  const res = await api.get<Program[]>(PROGRAMS_ENDPOINT);
  return res.data;
};

// COS: Update an existing program by ID
// Sends a PUT request to update a program's information by its unique ID
export const updateProgram = async (id: string, program: Program) => {
  const res = await api.put<Program>(`${PROGRAMS_ENDPOINT}/${id}`, program);
  return res.data;
};

// COS: Retrieve a single program by ID
// Sends a GET request to fetch a program by its unique ID
export const getProgramById = async (id: string) => {
  const res = await api.get<Program>(`${PROGRAMS_ENDPOINT}/${id}`);
  return res.data;
};

// COS: Delete a program by ID
// Sends a DELETE request to remove a program by its unique ID
export const deleteProgram = async (id: string) => {
  const res = await api.delete(`${PROGRAMS_ENDPOINT}/${id}`);
  return res.data;
};