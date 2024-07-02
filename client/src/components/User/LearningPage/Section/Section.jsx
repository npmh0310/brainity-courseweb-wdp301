import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Chapter from '../Chapter/Chapter'
function Section(props) {
    const [show, setShow] = useState(false)
    const {courseId, section} = props

    return (
        <div className='  py-2 border-y bg-[#f7f9fa]'>
            <div className='flex justify-between px-2   items-start gap-2' onClick={() => setShow(!show)}>
                <div className=' cursor-pointer'>
                    <h2 className='text-sm font-semibold text-start'>
                        {section.sectionName}
                    </h2>
                    <span className=' text-sm text-slate-800 tracking-wider'>
                        2hr33min
                    </span>
                </div>
                <ChevronDown className={`ml-2 mt-1 group-hover:text-gray-800 transition-all ease-in-out ${!show ? '-rotate-180 origin-center transition-transform duration-150 ease-in-out' : 'rotate-0 origin-center transition-transform duration-150 ease-in-out'}`} />
            </div>
            <div className='video flex flex-col items-start bg-white '>
                {show && section.lessons &&<>
                    {section.lessons.map((chapter, index) => (<Chapter courseId={courseId} key={index} chapter = {chapter}/>))}
                    
                </>}
            </div>


        </div>
    )
}

export default Section