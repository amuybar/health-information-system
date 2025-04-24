import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto font-mono bg-white text-black">
      <header className="mb-8 border-b border-grey-100 pb-4">
        <h1 className="text-2xl font-bold mb-1">HEALTH INFORMATION SYSTEM</h1>
        <p className="text-gray-600">ADMINISTRATIVE CONSOLE v2.4.1</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {/* Client Management */}
        <div className="border border-grey-100 p-4">
          <div className="flex items-center mb-3">
            <span className="mr-2">&gt;</span>
            <h2 className="text-lg font-bold">CLIENT MANAGEMENT</h2>
          </div>
          <ul className="space-y-2 pl-6">
            <li>
              <Link to="/clients" className="hover:underline flex items-center">
                <span className="mr-2">▸</span>
                VIEW REGISTERED CLIENTS
              </Link>
            </li>
            <li>
              <Link to="/clients/add" className="hover:underline flex items-center">
                <span className="mr-2">▸</span>
                REGISTER NEW CLIENT
              </Link>
            </li>
          </ul>
        </div>

        {/* Program Management */}
        <div className="border border-grey-100 p-4">
          <div className="flex items-center mb-3">
            <span className="mr-2">&gt;</span>
            <h2 className="text-lg font-bold">PROGRAM MANAGEMENT</h2>
          </div>
          <ul className="space-y-2 pl-6">
            <li>
              <Link to="/programs" className="hover:underline flex items-center">
                <span className="mr-2">▸</span>
                VIEW HEALTH PROGRAMS
              </Link>
            </li>
            <li>
              <Link to="/programs/add" className="hover:underline flex items-center">
                <span className="mr-2">▸</span>
                CREATE NEW PROGRAM
              </Link>
            </li>
          </ul>
        </div>

        {/* Enrollment */}
        <div className="border border-grey-100 p-4">
          <div className="flex items-center mb-3">
            <span className="mr-2">&gt;</span>
            <h2 className="text-lg font-bold">ENROLLMENT</h2>
          </div>
          <ul className="space-y-2 pl-6">
            <li>
              <Link to="/enroll" className="hover:underline flex items-center">
                <span className="mr-2">▸</span>
                ENROLL CLIENT INTO PROGRAM
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <footer className="mt-8 pt-4 border-t border-grey-100 text-center text-sm">
        <p>SYSTEM READY | {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</p>
      </footer>
    </div>
  );
}