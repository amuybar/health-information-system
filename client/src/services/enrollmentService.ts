import api from "./api";
import { Enrollment, EnrollmentCreate } from "../types";

export const enrollClient = async (data: EnrollmentCreate) => {
  const res = await api.post<Enrollment>("/enrollments", data);
  return res.data;
};

export const getEnrollments = async () => {
  const res = await api.get<Enrollment[]>("/enrollments");
  return res.data;
};