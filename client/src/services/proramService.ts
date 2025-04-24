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