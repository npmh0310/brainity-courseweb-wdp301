
import React from 'react'
import { useSelector } from 'react-redux'
import { getCoursesInCart , getAllInCart } from '../../../redux/features/cartSlice'
import { formatCurrencyVND } from '../../../function/function'
import { Link, useNavigate } from 'react-router-dom'


function ModalCart() {
 
    const courseInCart = useSelector(getAllInCart)
    const total = courseInCart ? courseInCart.reduce((sum, data) => sum + data.course.price, 0) : 0;
    const navigate = useNavigate()
    const goToCart = () => {
        navigate('/cart')
    }
  return (
    <div className="   bg-white">
      {courseInCart.length > 0 ? (
        <div className="flex flex-col p-4 items-start">
          {courseInCart.map((data, index) => (
            <div className=" flex justify-between items-start pt-2 pb-3 mb-2 border-b border-gray-200">
              <img
                className=" w-1/4 mt-1 h-full object-cover"
                src={data.course.imageUrl}
                alt=""
              />
              <div className=" w-3/4 pl-3 text-sm text-start">
                <Link
                  to={`course/${data.course._id}`}
                  className=" text-[16px] text-black font-semibold cursor-pointer "
                >
                  {data.course.courseName}
                </Link>
                <div className="text-gray-700 text-xs tracking-wide mb-1">
                  By{" "}
                  <Link className=" underline" href="#">
                    {data.course.instructor.username}
                  </Link>
                </div>
                <h1 className=" text-[15px] text-black font-semibold mb-1">
                  {formatCurrencyVND(data.course.price)}
                </h1>
              </div>
            </div>
          ))}
          {courseInCart.length > 0 && (
            <h1 className=" text-lg text-black font-bold pt-2 pb-3 ">
              Total: {formatCurrencyVND(total)}
            </h1>
          )}

          <div
            className=" w-full p-3 bg-primary text-white font-semibold uppercase cursor-pointer text-center hover:bg-opacity-80 hover:font-bold text-sm transition-all ease-in-out"
            onClick={goToCart}
          >
            Go to cart
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="my-10  text-sm text-gray-800">Your cart is empty.</h1>
          <Link
            className="block w-full py-3 border-t-[1px]  text-center font-medium hover:text-primary"
            to={"/categories"}
          >
            Go to categories
          </Link>
        </div>
      )}
    </div>
  );
}

export default ModalCart;
