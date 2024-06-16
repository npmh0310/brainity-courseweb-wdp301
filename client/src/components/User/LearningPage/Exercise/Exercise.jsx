import { Checkbox } from '@mui/material'
import React from 'react'
import Question from '../Question/Question'
import { Button } from 'flowbite-react'

function Exercise() {
  return (
    <div className=' px-4 flex flex-col  mt-4 mx-auto'>
        <div className=' w-full flex flex-col justify-start p-2 border rounded-md'>
            <h2 className=' font-semibold text-2xl text-primary text-center uppercase underline'>Practice more</h2>
            <Question/>
            <Question/>

            <Question/>

            <Question/>
            <Question/>
            <Question/>

            <div className=' flex justify-end items-center gap-2'>
                <Button className=' p-2  bg-primary '> Check </Button>
                <Button className=' p-2 mr-8  bg-red-400 '> Reset </Button>

            </div>

            
        </div>
    </div>
  )
}

export default Exercise