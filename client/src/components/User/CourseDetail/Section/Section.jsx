import { ArrowDown, ChevronDown, Dot } from 'lucide-react'
import React, { useState } from 'react'
import Chapter from '../Chapter/Chapter';


function Section(props) {
    const { section } = props
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <div className=' py-4 px-6 flex flex-col gap-y-1 lg:flex-row lg:justify-between justify-start items-center bg-gray-100 border-x border-t cursor-pointer'
                onClick={toggleOpen}>
                <div className=' w-full lg:w-9/12 flex items-center lg:justify-start justify-center'>
                    <ChevronDown size={14} className={`mr-2 transition-transform ease-in-out origin-center duration-300 ${isOpen ? '-rotate-180' : 'rotate-0'}`} />
                    <span className=' text-sm font-semibold text-black'> {section.sectionName} </span>
                </div>
                <div className=' flex justify-start items-center text-sm gap-x-1'>
                    <div>
                        {section.length} lessons
                    </div>
                    <Dot size={12} />
                    <div>
                        10min
                    </div>
                </div>
            </div>
            {isOpen &&
                <div className={`py-4 px-6 flex flex-col w-full `}>
                    {section.lessons && section.lessons.length !== 0 && section.lessons.map((lesson, index) => (
                        <Chapter key={index} lesson={lesson} />
                    ))}

                    {/* <Chapter />
                    <Chapter />
                    <Chapter />
                    <Chapter />
                    <Chapter /> */}

                </div>}
        </div>
    )
}

export default Section