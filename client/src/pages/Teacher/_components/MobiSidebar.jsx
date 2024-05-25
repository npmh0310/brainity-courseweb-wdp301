import { Menu } from 'lucide-react'
import React, { useState } from 'react'
import Sidebar from './Sidebar'

const MobileSidebar = () => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <>
            {/* đợi hiếu gửi code */}
            {
                open ?
                    <div className={` md:hidden p-0 bg-white h-full w-56 flex-col fixed inset-y-0 z-40`}>
                        <Sidebar />
                    </div>
                    :
                    <div className='md:hidden pr-4 hover:opacity-75 transition'>
                        <Menu onClick={handleClick} />
                    </div>
            }

        </>
    )
}

export default MobileSidebar