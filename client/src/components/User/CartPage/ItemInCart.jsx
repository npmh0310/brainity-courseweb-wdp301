import React from 'react'
import Star from '../../../assets/images/star.png'
import courseimg from '../../../assets/images/photo.jpg'
import { Tag } from 'lucide-react'
function ItemInCart() {
  return (
    <div className=' py-4 border-t flex justify-between items-start'>
              <div className=' basis-1/6 w-full pr-2'>
                <img className=' w-full h-full object-cover' src={courseimg} alt="" />
              </div>
              <div className=' basis-4/6 w-full flex flex-col lg:flex-row gap-y-3'>
                <div className=' basis-5/6 banner flex flex-col px-2 mb-2 '>
                  <h1 className=' text-[16px] text-black font-bold mb-1'>
                    The Ultimate React Course 2024: React, Next.js, Redux & More
                  </h1>
                  <div className=' text-sm text-black mb-1'>
                    Master modern React from beginner to advanced! Next.js, Context API, React Query, Redux, Tailwind, advanced patterns
                  </div>
                  <div className=' text-gray text-sm tracking-wide mb-2'>
                     By <a className=' text-black underline' href="#">NgocTam</a>
                  </div>
                  <div className=' flex gap-2 text-black justify-start items-center '>
                    <div className='  p-1 bg-[#eceb98] text-sm text-center font-semibold text-black'>
                      Bestseller
                    </div>
                    <div className=' flex justify-center items-center gap-1 '>
                      <span className=' text-sm'>
                        4.9
                      </span>
                      <img className=' w-3 h-3 object-cover' src={Star} alt="" />
                      <img className=' w-3 h-3 object-cover' src={Star} alt="" />
                      <img className=' w-3 h-3 object-cover' src={Star} alt="" />
                      <img className=' w-3 h-3 object-cover' src={Star} alt="" />
                      <img className=' w-3 h-3 object-cover' src={Star} alt="" />
                    </div>

                    <span className=' text-gray-300 text-sm'>
                      12.999 rating
                    </span>
                  
                  </div>
                  
                </div>
                <div className=' flex text-sm px-2 lg:flex-col gap-x-3 gap-y-1 '>
                  <span className=' text-third lg:text-end hover:text-primary cursor-pointer transition-colors ease-in-out'>
                    Remove
                  </span>
                  <span className='  text-third lg:text-end hover:text-primary cursor-pointer transition-colors ease-in-out'>
                    Save for later
                  </span>
                  <span className='  text-third lg:text-end hover:text-primary cursor-pointer transition-colors ease-in-out text-nowrap'>
                    Move to wishlist
                  </span>
                </div>
              </div>
              <div className=' basis-1/6 w-full flex flex-col items-center '>
                  <div className=' flex justify-between gap-x-1 text-primary text-lg font-semibold'>
                    <span>đ249,000</span>
                    <Tag className=' mt-2' size={16}/>
                  </div>
                  
              </div>
            </div>
  )
}

export default ItemInCart