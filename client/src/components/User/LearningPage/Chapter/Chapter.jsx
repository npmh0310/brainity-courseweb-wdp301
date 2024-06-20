import { Checkbox } from 'flowbite-react'
import { ChevronDown, File, MonitorPlay, Play, Video } from 'lucide-react'
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { completedLesson } from '../../../../fetchData/UserChapterProgress'
import { useLessonProgress } from '../../../../hooks/LearningPageContext'

function Chapter(props) {
    const navigate = useNavigate()
    const { courseId, chapter } = props
    const [completed , setCompleted] = useState(chapter.isCompleted)
    const { updateLessonProgress } = useLessonProgress();

    const handleCompleted = async () => {
        const newCompletedState = !completed;
        setCompleted(!completed)
        const completedLessonProgress = await completedLesson({courseId: courseId, lessonId:chapter._id, isCompleted: !completed })
        updateLessonProgress(chapter._id, newCompletedState);

    }

    return (

        <div className=' p-2 w-full flex gap-2 bg-white cursor-pointer hover:bg-[#f7f9fa] '>
                <div className=' pt-1'>
                    <Checkbox checked={completed} onChange={handleCompleted}/>
                </div>
                <Link className=' w-full' to={`lesson/${chapter._id}`}>
                    <div className=' w-full'>
                        <p  className=' text-sm px-2 pb-1 '>{chapter.lessonName}</p>
                        <div className=' px-2 flex justify-between items-center'>
                            <div className=' flex gap-1 items-center '>
                                <MonitorPlay size={14} />
                                <span className='text-sm text-[#b0b0b0] '>2min</span>
                            </div>
                            <div className=' p-2 border-black border flex gap-2 items-center '>
                                <File size={14} />
                                <span className=' text-sm font-semibold'>Resource</span>
                                <ChevronDown size={14} />
                            </div>
                        </div>
                    </div>
                </Link>

        </div>
    )
}

export default Chapter