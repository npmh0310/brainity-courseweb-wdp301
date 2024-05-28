import React, { useEffect, useState } from 'react';
import { Logo } from '../components/common/Logo';
import { ChevronDown, ChevronLeft, Forward, Search, SettingsIcon, Sparkle, X } from 'lucide-react';
import { Box, Popover } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import Section from '../components/LearningPage/Section/Section';
import Footer from '../components/common/Footer/Footer';
import { Link, NavLink, Outlet } from 'react-router-dom';

function LearningPage() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false)
    const [showCourse, setShowCourse] = useState(true)
    const [innerWidth, setInnerWidth] = useState(true)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        const handleScroll = () => {
            const headerHeight = document.querySelector('.headerLearning').offsetHeight;
            if (window.scrollY > headerHeight) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };


        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setShowCourse(false);
                setInnerWidth(false)
            } else {
                setShowCourse(true);
                setInnerWidth(true)
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Check initial window size
        handleResize();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <div className='bg-white h-[5000px]'>
            <div className='headerLearning p-4 bg-white flex justify-between items-center gap-x-4'>
                <a className='-translate-x-4' href="/">
                    <Logo />
                </a>
                <div className='ml-4 flex justify-start items-center w-8/12 '>
                    <a href="#">[NEW] Spring Boot 3, Spring 6 & Hibernate for Beginners</a>
                </div>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <div className='p-4 flex flex-col gap-y-2 justify-center items-start text-sm'>
                        <span className='font-bold'>203 of 390 complete</span>
                        <span>Finish course to get your certificate</span>
                    </div>
                </Popover>
                <div aria-describedby={id} className='flex justify-center items-center text-sm group cursor-pointer' onClick={handleClick}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', marginRight: 1 }}>
                        <CircularProgress size="md" determinate value={66.67}>
                            <Sparkle />
                        </CircularProgress>
                    </Box>
                    <span className='group-hover:text-slate-300 transition-all ease-in-out'>
                        Your Progress
                    </span>
                    <ChevronDown className='group-hover:text-gray-800 transition-all ease-in-out' />
                </div>
                <div className='hidden text-sm sm:flex justify-center items-center gap-2'>
                    <div className='p-2 border border-black flex justify-center items-center gap-2 cursor-pointer'>
                        Share
                        <Forward className='text-slate-400 -translate-y-1' />
                    </div>
                    <div className='p-2 border border-black text-center cursor-pointer'>
                        <SettingsIcon />
                    </div>
                </div>
            </div>
            <div className='relative w-full flex'>
                <div className={`${showCourse ? 'w-9/12' : 'w-full'}  flex flex-col`}>
                    <div className=' relative bg-black video w-full h-[600px]'>
                        {(!showCourse && innerWidth) && <Link to='overView' className=' absolute top-[10%] right-0 px-4 py-2 border-white bg-black hover:bg-slate-800 cursor-pointer'
                            onClick={() => setShowCourse(!showCourse)}>
                            <ChevronLeft size={14} color='white' />
                        </Link>}
                    </div>
                    <div className={`${!showCourse ? 'lg:w-9/12' : 'sm:w-full'} px-4 mx-auto  flex flex-col`}>
                        <div className=' px-4 min-w-[880px]  flex border-b  justify-start items-center gap-4 '>
                            <NavLink to='search' className={({ isActive }) => isActive ? 'py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer' : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"}><Search size={16} /></NavLink>
                            {!showCourse && <NavLink to='courseContent' className={({ isActive }) => isActive ? 'py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer' : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"}>Course Content</NavLink>}
                            <NavLink to='overView' className={({ isActive }) => isActive ? 'py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer' : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"}>Overview</NavLink>
                            <NavLink to='exercise' className={({ isActive }) => isActive ? 'py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer' : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"}>Exercise</NavLink>
                            {/* <NavLink to='learning tool' className={({ isActive }) => isActive ? 'py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer' : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"}>Learning tool</NavLink> */}
                            <NavLink to='notes' className={({ isActive }) => isActive ? 'py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer' : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"}>Notes</NavLink>
                            {/* <NavLink to='Q&A' className={({ isActive }) => isActive ? 'py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer' : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"}>Q&A</NavLink>
                            <NavLink to='kkk' className={({ isActive }) => isActive ? 'py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer' : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"}>Overview</NavLink> */}
                        </div>
                        <div className=' mt-4'>
                            <Outlet/>
                        </div>
                    </div>

                </div>
                <div className={`px-2 ${showCourse ? 'flex' : 'hidden'}  flex-col overflow-y-auto fixed right-0 ${isScrolled ? 'top-0' : ''} h-screen w-3/12 z-10 bg-white border-x animate-transCourse `}>
                    <div className='flex justify-between items-center sticky top-0 bg-white z-10'>
                        <h2 className='p-2 text-lg font-semibold text-start'>Course Content</h2>
                        <X size={18} className=' mr-2 cursor-pointer' onClick={() => setShowCourse(!showCourse)} />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <Section />
                        <Section />
                        <Section />
                        <Section />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LearningPage;
