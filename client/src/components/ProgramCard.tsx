import { Program } from "../types";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md">
      <h2 className="text-lg font-semibold">{program.name}</h2>
      <p>{program.description}</p>
    </div>
  );
}