import React from 'react'

import { X } from 'lucide-react'
import Section from '../Section/Section'
import { useLocation } from 'react-router-dom'
function CourseContent() {
    const location = useLocation()
    const {course} = location.state || {}
    return (
        <div className=' flex flex-col w-full lg:w-10/12 mx- pb-4'>
            <div className='flex justify-between items-center sticky top-0 bg-white z-10'>
                <h2 className='p-2 text-lg font-semibold text-start'>Course Content</h2>
            </div>
            <div className='flex flex-col mt-2'>
            {course.sections && course.sections.map((section ,index) => (<Section section = {section} key={index}/>))}
            </div>
        </div>
    )
}

export default CourseContent