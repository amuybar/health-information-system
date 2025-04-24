import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/clients", label: "Clients" },
  { to: "/programs", label: "Programs" },
  { to: "/enroll", label: "Enroll" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="w-full border-b border-black mb-6 py-6 px-5 flex items-center justify-between bg-white font-mono shadow-sm">
      <Link to={'/'} className="font-extrabold tracking-widest text-lg text-black">
        HIS SYSTEM
      </Link>
      <div className="space-x-2">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-2 py-1 border border-black rounded-sm bg-white text-black  transition 
              ${location.pathname === link.to ? "bg-grey-500 text-blue-900" : "hover:bg-gray-500 text-black"}`}
            style={{ fontFamily: "monospace" }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}