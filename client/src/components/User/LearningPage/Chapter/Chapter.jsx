import { Checkbox } from 'flowbite-react'
import { Check, ChevronDown, Circle, CircleCheck, File, MonitorPlay, Play, Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { completedLesson } from '../../../../fetchData/UserChapterProgress'
import { useDispatch } from 'react-redux'
import { updateLessonProgress } from '../../../../redux/features/learningSlice'

function Chapter(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { courseId, chapter } = props
    const [completed , setCompleted] = useState(false)
    const url = useLocation()
    const lesson_id  = url.pathname.split('/lesson/')[1]

    const handleCompleted = async () => {
        if(!chapter.isCompleted){
            const newCompletedState = !completed;
            setCompleted(!completed)
            const completedLessonProgress = await completedLesson({courseId: courseId, lessonId:chapter._id, isCompleted: !completed })
            if(completedLessonProgress.status === 200) {
                dispatch(updateLessonProgress({ lessonId: chapter._id, isCompleted: newCompletedState }));
            }
        }

    }
    useEffect(() => {
        setCompleted(chapter.isCompleted)
    },[chapter])

    return (

        <div className={` p-2 w-full flex gap-2 cursor-pointer hover:bg-[#f7f9fa] transition-all ease-in-out ${lesson_id === chapter._id ?  'bg-[#f7f9fa]' : 'bg-white'}  `}>
                <div className=' pt-1' onClick={handleCompleted}>
                    {/* <Checkbox checked={completed} onChange={handleCompleted}/> */}
                    {completed ? <CircleCheck className=' bg-primary text-white rounded-full'/> : <Circle/> }
                </div>
                <Link className=' w-full' to={`lesson/${chapter._id}`}>
                    <div className=' w-full'>
                        <p  className=' text-sm px-2 pb-1 '>{chapter.lessonName}</p>
                        <div className=' px-2 flex justify-between items-center'>
                            <div className=' flex gap-1 items-center '>
                                <MonitorPlay size={14} />
                                <span className='text-sm text-[#b0b0b0] '>2min</span>
                            </div>
                            {/* <div className=' p-2 border-black border flex gap-2 items-center '>
                                <File size={14} />
                                <span className=' text-sm font-semibold'>Resource</span>
                                <ChevronDown size={14} />
                            </div> */}
                        </div>
                    </div>
                </Link>

        </div>
    )
}

export default Chapter