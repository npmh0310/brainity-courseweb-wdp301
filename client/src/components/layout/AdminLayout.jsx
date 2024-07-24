import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Navbar from "../../components/Admin/AdminNavbar";
import Sidebar from "../../components/Admin/AdminSidebar";
import routes from "../../routes/admin.routes";
import { useSelector } from "react-redux";

export default function AdminLayout(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("");

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1200);
    window.addEventListener("resize", handleResize);
    handleResize(); // Check initially
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const route = routes.find((route) =>
      location.pathname.includes(route.path)
    );
    setCurrentRoute(route ? route.name : "Main Dashboard");
  }, [location.pathname]);

  const renderRoutes = (routes) =>
    routes.map((route, key) =>
      route.layout === "/admin" ? (
        <Route path={`/${route.path}`} element={route.component} key={key} />
      ) : null
    );
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (user.role === "user") {
    navigate("/");
  }

  return (
    <>
      {user.role === "admin" ? (
        <div className="flex h-full w-full bg-gray-50 ">
          <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="h-full w-full">
            <main className="h-full flex-none transition-all md:pr-2 xl:ml-72">
              <Navbar
                onOpenSidenav={() => setSidebarOpen(true)}
                brandText={currentRoute}
              />
              <div className="mx-auto mb-auto h-[100vh] p-2 md:pr-2 bg-gray-50">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div>hello</div>
      )}
    </>
  );
}
