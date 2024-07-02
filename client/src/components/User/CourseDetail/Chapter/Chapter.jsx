import { Dot, MonitorPlay } from 'lucide-react'
import React from 'react'

function Chapter(props) {
  const {lesson} = props
  return (
    <div className=' py-3 w-full flex items-center'>
        <MonitorPlay size={14} className=' mr-2'/>
        <div className=' w-full flex justify-between items-center'>
            <a className=' text-sm text-purple-600 underline hover:text-purple-800 cursor-pointer' href="#">{lesson.lessonName}</a>
            <div className=' flex justify-between gap-2 items-center text-sm'>
                <span>Preview</span>
                <Dot size={12}/>
                <span>10min</span>
            </div>
        </div>
    </div>
  )
}

export default Chapter