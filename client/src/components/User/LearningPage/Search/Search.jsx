import { SearchIcon } from 'lucide-react'
import React from 'react'
import Section from '../Section/Section'

function Search() {
  return (
    <div className=' flex flex-col w-full lg:w-9/12 mx-auto mt-10'>
        <div className=' w-full flex items-center '>
            <input className=' w-full px-4 border-y border-l border-black  h-10 ' type="text" name="" id="" placeholder='Search course content' />
            <span className=' w-10 h-10 border border-primary bg-primary cursor-pointer flex justify-center items-center '>
                <SearchIcon color=' white'/>
            </span>
        </div>
        <div className=' p-4 mt-[48px] flex flex-col items-start '>
            Results for "react j" (5 lectures)
        </div>
        <Section/>
    </div>
  )
}

export default Search