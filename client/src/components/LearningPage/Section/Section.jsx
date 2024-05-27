import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Chapter from '../../Chapter/Chapter'
function Section() {
    const [show, setShow] = useState(false)

    return (
        <div className='  py-2 border-y bg-[#f7f9fa]'>
            <div className='flex justify-between px-2   items-start gap-2' onClick={() => setShow(!show)}>
                <div className=' cursor-pointer'>
                    <h2 className='text-sm font-semibold text-start'>
                        Section 1: New -Spring boot 3 quick start
                    </h2>
                    <span className=' text-sm text-slate-800 tracking-wider'>
                        2hr33min
                    </span>
                </div>
                {!show ?
                    <ChevronDown className='  ml-2 mt-1 group-hover:text-gray-800 transition-all ease-in-out' />
                    :
                    <ChevronUp className='  ml-2 mt-1 group-hover:text-gray-800 transition-all ease-in-out' />}
            </div>

            <div className='video flex flex-col items-start bg-white '>
                {show && <>
                    <Chapter />
                    <Chapter />
                    <Chapter />
                    <Chapter />
                    <Chapter />

                </>}
            </div>


        </div>
    )
}

export default Section