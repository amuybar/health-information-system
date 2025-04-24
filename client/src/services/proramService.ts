import api from "./api";
import { Program, ProgramCreate } from "../types";

export const createProgram = async (program: ProgramCreate) => {
  const res = await api.post<Program>("/programs", program);
  return res.data;
};

export const getPrograms = async () => {
  const res = await api.get<Program[]>("/programs");
  return res.data;
};

export const updateProgram = async (id: string, program: Program) => {
  const res = await api.put<Program>(`/programs/${id}`, program);
  return res.data;
};

export const getProgramById = async (id: string) => {
  const res = await api.get<Program>(`/programs/${id}`);
  return res.data;
};

export const deleteProgram = async (id: string) => {
  const res = await api.delete(`/programs/${id}`);
  return res.data;
}