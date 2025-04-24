import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Health Info System</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/clients" className="hover:underline">Clients</Link>
        <Link to="/programs" className="hover:underline">Programs</Link>
      </div>
    </nav>
  );
}