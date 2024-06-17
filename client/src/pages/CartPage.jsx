import React from "react";
import { Tag } from "lucide-react";
import { Button } from "flowbite-react";
import ItemInCart from "../components/User/CartPage/ItemInCart";
function CartPage() {
  return (
    <div className=" max-w-[1440px] mx-auto px-10 animate-open">
      <h1 className=" mt-8 text-4xl font-bold text-[#2d2f31] text-start">
        Shopping Cart
      </h1>
      <div className=" flex flex-col lg:flex-row mb-4">
        <div className=" lg:w-9/12 w-full ">
          <div className=" mt-8 flex flex-col gap-y-4">
            <h3 className=" font-semibold mb-2">2 Course in Cart</h3>
            {/* <div className=' py-4 border-y-2 flex justify-between items-start'>
              <div className=' basis-1/6 w-full pr-2'>
                <img className=' w-full h-full object-cover' src={courseimg} alt="" />
              </div>
              <div className=' basis-4/6 w-full flex flex-col lg:flex-row gap-y-3'>
                <div className=' basis-5/6 banner flex flex-col px-2 mb-2 '>
                  <h1 className=' text-lg text-black font-bold mb-2'>
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
                <div className=' flex px-2 lg:flex-col gap-x-3 gap-y-2'>
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
            </div> */}
            <ItemInCart />
          </div>
          <div className=" mt-8 flex flex-col gap-y-4">
            <h3 className=" font-semibold mb-2">2 Course for Later</h3>
            <ItemInCart />
          </div>
        </div>
        <div className=" lg:w-3/12 pl-6 w-full flex flex-col items-start py-4">
          <div className=" mt-8 mb-4 text-start">
            <h3 className=" text-third font-semibold mb-4">Total:</h3>
            <h2 className=" text-3xl text-gray-600 font-semibold">₫598,000</h2>
          </div>
          <button
            className="  px-2 py-1 rounded-none w-full bg-primary hover:bg-opacity-75 "
            color="success"
          >
            <span className=" text-white text-xl font-bold tracking-wide ">
              Checkout
            </span>
          </button>
          <div className=" my-4 w-full border-y"></div>
          <div className=" w-full">
            <h3 className=" text-third font-semibold mb-4">Promotions</h3>
            <div className=" flex">
              <input
                type="text"
                placeholder="Enter Coupon"
                className=" w-11/12 px-2 py-1 border border-black text-sm"
              />
              <Button className=" px-2 py-1 rounded-none bg-primary border-primary hover:bg-opacity-75">
                <span className=" text-white text-sm font-bold">Apply</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
