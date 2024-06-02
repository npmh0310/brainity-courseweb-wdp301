
import React from 'react'
import Star from '../assets/images/star.png'
import { Check, Dot, Heart, Infinity, MonitorPlay, MonitorSmartphone, Trophy } from 'lucide-react'
import Section from '../components/CourseDetail/Section/Section'
import { useState, useEffect } from 'react'

function CourseDetail() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const headerHeight = document.querySelector('.banner').offsetHeight;
            if (window.scrollY > headerHeight) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
            
            

        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className=' courseDetail w-full '>
            <div className='  bg-[#2d2f31]'>
                <div className=' relative banner max-w-[1280px] py-8 mx-auto flex justify-start '>
                    <div className=' w-full px-2 lg:w-8/12 flex flex-col '>
                        <h1 className=' text-3xl text-white font-bold mb-4'>
                            The Ultimate React Course 2024: React, Next.js, Redux & More
                        </h1>
                        <div className=' text-sm text-white mb-6'>
                            Master modern React from beginner to advanced! Next.js, Context API, React Query, Redux, Tailwind, advanced patterns
                        </div>
                        <div className=' flex gap-2 text-white justify-start items-center mb-6'>
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

                            <span className=' text-purple-300 text-sm'>
                                12.999 rating
                            </span>
                            <div className=' text-white text-sm'>
                                90,817 students
                            </div>
                        </div>
                        <div className=' text-white text-sm tracking-wide'>
                            Create by <a className=' text-purple-200 underline' href="#">NgocTam</a>
                        </div>
                    </div>
                    <div className=' relative w-4/12'>
                        <div className={` courseView hidden lg:flex  ml-4 min-w-[320px] w-[320px]   bg-white shadow-lg ${isScrolled ? 'fixed   animate-open  ' : 'absolute'} `}>
                            <div className=' w-full'>
                                <div className=' flex justify-center items-center mb-2'>
                                    <iframe src="https://www.youtube.com/watch?v=SXmpbDBbJCw" frameborder="0"></iframe>
                                </div>
                                <div className=' p-6 w-full flex flex-col gap-y-2 items-start'>
                                    <span className=' text-2xl text-black font-semibold'>
                                        đ360.000
                                    </span>
                                    <div className=' w-full flex justify-between items-center '>
                                        <div className=' p-3 w-9/12 text-sm font-semibold text-white text-center bg-primary border '>
                                            Go to cart
                                        </div>
                                        <div className=' p-3  flex items-center justify-center  w-2/12 border border-black '>
                                            <Heart size={14} />
                                        </div>
                                    </div>
                                    <div className=' p-3 w-full text-lg font-semibold text-black text-center bg-[#eceb98] border border-black '>
                                            Buy now
                                    </div>
                                    <div className=' mt-4 flex flex-col gap-y-2 items-start'>
                                        <h2 className=' text-sm text-start font-semibold mb-1'>
                                            This course includes: 
                                        </h2>
                                        <div className=' flex gap-x-2 justify-between items-center'>
                                            <MonitorPlay size={12} />
                                            <span className=' text-[12px]'>
                                                1.5 hours on-demand video
                                            </span>
                                        </div>
                                        <div className=' flex gap-x-2 justify-between items-center'>
                                            <MonitorSmartphone size={12} />
                                            <span className=' text-[12px]'>
                                                Access on mobile and pc
                                            </span>
                                        </div>
                                        <div className=' flex gap-x-2 justify-between items-center'>
                                            <Infinity size={12} />
                                            <span className=' text-[12px]'>
                                                Full time access
                                            </span>
                                        </div>
                                        <div className=' flex gap-x-2 justify-between items-center'>
                                            <Trophy size={12} />
                                            <span className=' text-[12px]'>
                                            Certificate of completion
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
            <div className='max-w-[1280px] pt-8 mx-auto  flex justify-start '>
                <div className=' w-full px-2 lg:w-8/12 flex flex-col gap-y-6 '>
                    <div className=' py-6 pb-4 border '>
                        <h2 className=' text-xl text-start font-semibold mx-6 mb-4'>
                            What you'll learn
                        </h2>
                        <div className=' flex justify-center items-center mx-6'>
                            <ul className='  grid grid-cols-2 gap-x-3'>
                                <li>
                                    <div className=' py-1 flex justify-start items-start'>
                                        <Check />
                                        <span className=' text-sm text-black ml-2'>
                                            Become an advanced, confident, and modern React developer from scratch
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className=' py-1 flex justify-start items-start'>
                                        <Check />
                                        <span className=' text-sm text-black ml-2'>
                                            Become an advanced, confident, and modern React developer from scratch
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className=' py-1 flex justify-start items-start'>
                                        <Check />
                                        <span className=' text-sm text-black ml-2'>
                                            Become an advanced, confident, and modern React developer from scratch
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className=' py-1 flex justify-start items-start'>
                                        <Check />
                                        <span className=' text-sm text-black ml-2'>
                                            Become an advanced, confident, and modern React developer from scratch
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className=' py-1 flex justify-start items-start'>
                                        <Check />
                                        <span className=' text-sm text-black ml-2'>
                                            Become an advanced, confident, and modern React developer from scratch
                                        </span>
                                    </div>
                                </li>


                            </ul>
                        </div>
                    </div>
                    <div className=' pt-4 mb-4'>
                        <h2 className=' text-xl text-start font-semibold mb-2'>
                            This course includes:
                        </h2>
                        <div className=' flex justify-start items-center'>
                            <ul className=' w-9/12 grid grid-cols-2 gap-x-4'>
                                <li>
                                    <div className=' flex justify-start items-center py-1'>
                                        <MonitorPlay size={14} />
                                        <span className=' text-sm ml-2'>
                                            84 hours on-demand video
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className=' flex justify-start items-center py-1'>
                                        <MonitorPlay size={14} />
                                        <span className=' text-sm ml-2'>
                                            84 hours on-demand video
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className=' flex justify-start items-center py-1'>
                                        <MonitorPlay size={14} />
                                        <span className=' text-sm ml-2'>
                                            84 hours on-demand video
                                        </span>
                                    </div>
                                </li>


                            </ul>
                        </div>
                    </div>
                    <div className=' pt-4'>
                        <h2 className=' text-xl text-start font-semibold mb-4'>
                            Course content
                        </h2>
                        <div className=' flex justify-between items-center'>
                            <div className=' flex items-center gap-x-1 my-2 text-sm '>
                                <span>40 sections</span>
                                <Dot size={12} />
                                <span>505 lectures</span>
                                <Dot size={12} />

                                <span>83h 52m total length</span>
                            </div>
                            <span className=' text-sm font-semibold text-purple-400 hover:text-purple-900 transition-all ease-in-out cursor-pointer text-end'>
                                Expand all section
                            </span>
                        </div>
                        <div className=' flex flex-col'>
                            <Section />
                            <Section />
                            <Section />
                            <Section />
                        </div>
                    </div>
                    <div className=' py-4'>
                        <h2 className=' text-xl text-start font-semibold mb-4'>
                            Description
                        </h2>
                        <div className=' w-full flex flex-col gap-y-2  text-sm text-start' >
                            <p >
                                We all face times in our lives where we have to make challenging, sometimes life-altering decisions. We might be choosing or switching careers, or picking a college major. We might be going through a divorce or other moment of crisis. Sometimes it can simply be recognition of a lack of fulfillment and purpose in our personal and professional lives.
                            </p>
                            <strong>
                                Self Inventory as a Path to Employment and Career Fulfillment
                            </strong>
                            <p>
                                Too often, career search begins with looking for employment vacancies; scanning the job markets and trying to figure out how to best “fit in", writing a resume, searching employment ads, and replying and waiting for responses.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CourseDetail