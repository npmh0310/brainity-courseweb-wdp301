import React from 'react'

import { useNavigate, useLocation } from "react-router-dom";

const SidebarItem = (props) => {
    const { label, icon: Icon, href } = props

    const navigate = useNavigate();
    const location = useLocation();

    // console.log(location.pathname)

    const isActive =
        (location.pathname === "/teacher" && href === "/teacher") ||
        location.pathname === href ||
        location.pathname?.startsWith(`/teacher/${href}/`)

    const handleClick = () => {
        navigate(href)
    }

    return (
        <button
            onClick={handleClick}
            type='button'
            // className={cn()}
            className={!isActive
                ? "flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all text-slate-500 hover:text-slate-600 hover:bg-slate-300/20"
                : "flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all text-green-700 bg-green-200/20 hover:bg-green-200/20 hover:text-green-700"}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={isActive ? "text-green-700" : "text-slate-500"}
                />
                {label}
            </div>
            <div className={isActive ? "ml-auto opacity-100 border-2 border-green-700 h-full transition-all" : "ml-auto opacity-0 border-2 border-green-700 h-full transition-all"} />

        </button>
    )
}

export default SidebarItem