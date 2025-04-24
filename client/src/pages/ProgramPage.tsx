import { useEffect, useState } from "react";
import { Program } from "../types";
import { getPrograms } from "../services/proramService";
import ProgramCard from "../components/ProgramCard";

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    getPrograms().then(setPrograms);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Health Programs</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
}