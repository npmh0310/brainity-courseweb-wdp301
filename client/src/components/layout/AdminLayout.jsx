import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import Navbar from "../../components/common/Admin/AdminNavbar";
import Sidebar from "../../components/common/Admin/AdminSidebar";
import routes from "../../routes/admin.routes";

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

  return (
    <div className="flex h-full w-full">
      <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:bg-navy-900">
        <main className="h-full flex-none transition-all md:pr-2 xl:ml-72">
          <Navbar
            onOpenSidenav={() => setSidebarOpen(true)}
            logoText="Horizon UI Tailwind React"
            brandText={currentRoute}
            secondary={
              routes.find(route => location.pathname.startsWith(route.layout + route.path))?.secondary
            }
            {...rest}
          />
          <div className="mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
            <Outlet/>
          </div>
        </main>
      </div>
    </div>
  );
}
