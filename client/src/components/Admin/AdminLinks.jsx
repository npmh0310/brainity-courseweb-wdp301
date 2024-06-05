/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

export function SidebarLinks({ routes }) {
  const location = useLocation();  // Hook to get the current location

  // Function to check if the route is active
  const isActiveRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  // Function to create sidebar links
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.layout === "/admin") {
        const isActive = isActiveRoute(route.path);

        return (
          <Link key={index} to={`${route.layout}/${route.path}`}>
            <div className="relative mb-3 flex hover:cursor-pointer my-4">
              <li className="mb-3 flex cursor-pointer items-center px-8">
                <span
                  className={`${
                    isActive ? "font-bold text-primary" : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : <IoMdHome />}
                </span>
                <p
                  className={`leading-1 ml-2 flex text-xl ${
                    isActive ? "font-bold text-navy-700 " : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {isActive && (
                <div className="absolute right-0 top-px h-7 w-1 rounded-lg bg-primary" />
              )}
            </div>
          </Link>
        );
      }
      return null;
    });
  };

  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
