import { Checkbox } from 'flowbite-react'
import { ChevronDown, File, Play, Video } from 'lucide-react'
import React from 'react'

function Chapter() {
  return (
    <div className=' p-2 w-full flex gap-2 bg-white cursor-pointer hover:bg-[#f7f9fa] '>
        <div className=' pt-1'>
            <Checkbox/>
        </div>
        <div className=' w-full'>
            <p className=' text-sm px-2 pb-1 '>What is React js</p>
            <div className=' flex justify-between items-center'>
                <div className=' flex gap-1 items-center '>
                    <Play size={14}/>
                    <span className='text-sm text-[#b0b0b0] '>2min</span>
                </div>
                <div className=' p-2 border-black border flex gap-2 items-center '>
                    <File size={14}/>
                    <span className=' text-sm font-semibold'>Resource</span>
                    <ChevronDown size={14}/>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Chapter