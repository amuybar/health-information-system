import { BrowserRouter, useRoutes, RouteObject } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import Clients from "./pages/ClientsPage";
import Programs from "./pages/ProgramPage";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/clients", element: <Clients /> },
  { path: "/programs", element: <Programs /> },
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