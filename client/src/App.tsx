import { BrowserRouter, useRoutes, RouteObject } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import Clients from "./pages/ClientsPage";
import Programs from "./pages/ProgramPage";
import Enroll from "./pages/Enrollmentpage";
import RegisterClient from "./pages/RegisterClients";
import CreateProgram from "./pages/CreateProgram";
import ClientProfile from "./pages/ClientProfilepage";
import ProgramDetail from "./pages/ProgramDetails";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/clients", element: <Clients /> },
  { path: "/clients/add", element: <RegisterClient /> },
  { path: "/clients/:id", element: <ClientProfile /> },
  { path: "/programs", element: <Programs /> },
  { path: "/programs/add", element: <CreateProgram /> },
  { path: "/programs/:id", element: <ProgramDetail/>},
  { path: "/enroll", element: <Enroll /> },
];

function AppRoutes() {
  return useRoutes(routes);
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}