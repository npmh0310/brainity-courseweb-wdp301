import React from 'react'

import { X } from 'lucide-react'
import Section from '../Section/Section'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
function CourseContent(props) {

    const lessonsProgress = useSelector((state) => state.learningSlice.lessonProgress)
    
    const {course} = props
    return (
        <div className=' flex flex-col w-full lg:w-10/12 mx-auto pb-4'>
            <div className='flex justify-between items-center sticky top-0 bg-white z-10'>
                <h2 className='p-2 text-lg font-semibold text-start'>Course Content</h2>
            </div>
            <div className='flex flex-col mt-2'>
            { lessonsProgress && lessonsProgress.map((section, index) => (<Section courseId={course._id} section={section} key={index} />))}
            </div>
        </div>
    )
}

export default CourseContent