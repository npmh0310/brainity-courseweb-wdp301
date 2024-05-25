import React from 'react'
import MobileSidebar from './MobiSidebar'
import Avatar from '../../../assets/images/6298053d43cd1.jpg'

const Navbar = () => {
    return (
        <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
            {/* <div className='md:hidden pr-4 hover:opacity-75 transition'> */}
            <MobileSidebar />
            {/* <div className=''>
                <img className="w-8 h-8 min-w-8 rounded-full" src={Avatar} alt="" />
            </div> */}
        </div>
    )
}

export default Navbar