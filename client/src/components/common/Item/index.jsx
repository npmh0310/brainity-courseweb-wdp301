import React from 'react'
import {  useNavigate } from 'react-router-dom'
import Star from '../../../assets/images/star.png'
function Item( props ) {
    const navigate = useNavigate()
    const handleClick = (id) => {
        navigate(`/course/${id}`)
    }
  const data = props.data
  return (
    <div className=' p-8 bg-white  lg:max-w-[380px] max-h-[450px] border-2 rounded-xl group hover:shadow-xl hover:-translate-y-2 transition-all ease-in-out duration-500  ' >
        <div className=' flex flex-col gap-y-4'>
            <div className=' w-full h-[190px] rounded-lg overflow-hidden group-hover:scale-110 transition-all ease-in-out duration-500 border'>
                <img src='' alt="img course" className=' bg-white w-full h-full object-cover ' />
            </div>
            <div className=' flex justify-between'>
                <div className=' flex items-center p-2 rounded-xl bg-[#EFEFF2] text-center text-sm font-semibold'>
                    Development
                </div>
                <div className=' bg-white p-2 flex justify-center items-center gap-x-1 '>
                    <img src={Star} alt="" className='w-4 h-4' />
                    <p className=' text-sm text-gray-300' >4.8 reviews</p>
                </div>
            </div>
            <h1 className=' font-bold text-lg text-start text-nowrap '>
            Javascript
            </h1>
            <p className=' text-[#161439] text-[15px] text-start'>
                <span className='text-[#6D6C80]'>By</span> David Millar
            </p>
            <div className='flex justify-between items-center'>
                <div className='rounded-2xl  border bg-black group/btn  hover:bg-white '>
                    <button className=' rounded-2xl border p-4 bg-primary text-center font-bold text-sm text-[#161439] -translate-x-1.5 -translate-y-1.5 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 transition-all ease-in-out duration-300'>
                        Enrol: Now ---
                    </button>
                </div>
                <p className=' font-bold text-primary text-xl'>
                    $500
                </p>
            </div>
        </div>
    </div>
  )
}

export default Item