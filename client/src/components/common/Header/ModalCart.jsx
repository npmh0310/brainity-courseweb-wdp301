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
        <div className=' max-w-[320px] p-4 bg-white'>
            {courseInCart ?
                <div className='flex flex-col items-start'>
                    {courseInCart.map((data, index) => (
                        <div className=' flex justify-between items-start pt-2 pb-3 mb-2 border-b border-gray-200'>
                            <img className=' w-1/4 h-full object-cover' src={data.course.imageUrl} alt="" />
                            <div className=' w-3/4 pl-3 text-sm text-start'>
                                <Link to={`course/${data.course._id}`} className=' text-[15px] text-black font-semibold cursor-pointer '>
                                    {data.course.courseName}
                                </Link>
                                <div className=' text-gray text-sm tracking-wide mb-1'>
                                    By <a className=' text-black underline' href="#">{data.course.instructor.username}</a>
                                </div>
                                <h1 className=' text-[15px] text-black font-semibold mb-1'>
                                    {formatCurrencyVND(data.course.price)}
                                </h1>
                            </div>
                        </div>
                    ))}

                    {courseInCart.length > 0 &&
                        <h1 className=' text-xl text-black font-bold pt-2 pb-3 '>
                            Total: {formatCurrencyVND(total)}
                        </h1>}

                    <div className=' w-full p-3 bg-primary text-white font-semibold uppercase cursor-pointer text-center hover:bg-opacity-80 hover:font-bold transition-all ease-in-out' onClick={goToCart}>
                        Go to cart
                    </div>

                </div> :
                <div className=''>
                    Nothing...
                </div>}
        </div>
    )
}

export default ModalCart