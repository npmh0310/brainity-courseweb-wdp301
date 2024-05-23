import React from 'react'

import SidebarItem from './Sidebar-Item';

import { Compass, LayoutList } from 'lucide-react'
const guestRoutes = [
    {
        icon: LayoutList,
        label: "Courses",
        path: "/teacher"
    },
    {
        icon: Compass,
        label: "Browse",
        path: "/teacher/analys"
    }
]

const SidebarRoutes = () => {
    const routes = guestRoutes;

    return (
        <div className='flex flex-col w-full'>
            {/* <LayoutDashboard /> */}
            {
                routes && routes.map((route) => (
                    <SidebarItem
                        key={route.path}
                        icon={route.icon}
                        label={route.label}
                        href={route.path}
                    />
                ))
            }
        </div>
    )
}

export default SidebarRoutes