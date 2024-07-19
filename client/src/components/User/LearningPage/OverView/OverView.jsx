
import React, { useEffect, useState } from 'react'
import Star from '../../../../assets/images/star.png'
import { Flag } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { parseISO, format } from 'date-fns';
import { formatDate } from '../../../../function/function';
import { getRatingCourse } from '../../../../fetchData/RatingOfCourse';
import { Rating } from '@mui/material';
import { getStudents } from '../../../../fetchData/Course';
function OverView(props) {
    const { course } = props
    const [ratingOfCourse, setRatingOfCourse] = useState()
    const [students ,setStudents] = useState(0)
    // rating
    const fetchRattingCourse = async (courseId) => {
        const response = await getRatingCourse(courseId);

        if (response != null) {
            setRatingOfCourse(response.data);
        }
    };
    const fetchStudents = async (courseId) => {
        
        const res = await getStudents(courseId)
        if (res.status === 200) {
            setStudents(res.data.total)
        }
    }



    
    useEffect(() => {
        if(course._id && course._id !== '' && course._id !== null) {
            fetchStudents(course._id)
            fetchRattingCourse(course._id);
        }
    }, [course._id]);

    return (
        <div className=' px-4 flex flex-col w-full mx-auto'>
            <h1 className=' mb-6 text-2xl text-[#2D2F31]'>{course.courseName}</h1>
            <div className=' flex justify-start items-center mb-4 '>
                <div className=' flex flex-col  items-start'>
                    {ratingOfCourse &&
                        <div className=' flex justify-center items-center gap-2'>
                            <span className=' font-semibold'>{ratingOfCourse.avgRating}</span>
                            <Rating
                                className="mb-[2px]"
                                name="half-rating-read"
                                value={ratingOfCourse.avgRating || 0}
                                precision={0.1}
                                readOnly
                                size="small"
                            />
                        </div>}
                    <span className=' text-[#6a6f73] text-[12px]'>{ratingOfCourse && ratingOfCourse.numOfRates} ratings</span>
                </div>
                <div className=' flex flex-col  items-start ml-8'>
                    <div className=' flex justify-center items-center gap-2'>
                        <span className=' font-semibold'>{students}</span>
                    </div>
                    <span className=' text-[#6a6f73] text-[12px]'>Students</span>
                </div>
                {/* <div className=' flex flex-col  items-start ml-8'>
                    <div className=' flex justify-center items-center gap-2'>
                        <span className=' font-semibold'>33.5 hours</span>
                    </div>
                    <span className=' text-[#6a6f73] text-[12px]'>Total</span>
                </div> */}
            </div>
            <div className='  flex justify-start items-center mb-4'>
                <Flag size={12} className=' mr-2' />
                {/* <span className=' text-[12px]'>{formatDate(course.updatedAt)} </span> */}
            </div>
            <div className='p-6 flex items-start border-t'>
                <div className=' w-2/12 text-sm text-start'>
                    Description
                </div>
                <div className=' w-10/12 text-sm font-semibold '>
                    <p><strong>{course.description}</strong></p>
                    {/* <p><strong>NEW FOR SPRING BOOT 3 AND SPRING 6</strong></p>
                    <p><strong>POPULAR IDE - IntelliJ (free version)</strong></p>
                    <p><strong>#1 BEST SELLING SPRING BOOT &amp; HIBERNATE&nbsp;COURSE ON UDEMY - 350,000+ STUDENTS ENROLLED</strong></p>
                    <p><strong>OVER 78,000 REVIEWS - 5 STARS! </strong></p>

                    <p><strong>THIS COURSE COVERS SPRING BOOT 3 AND SPRING 6</strong></p>
                    <p><strong>LEARN these HOT TOPICS in Spring Boot 3 and Spring 6:</strong></p>
                    <ul><li><p><strong>Spring Boot 3</strong></p></li><li><p><strong>Spring Framework 6</strong></p></li><li><p><strong>Spring Boot 3 Core</strong></p></li><li><p><strong>Spring Boot 3 Annotations</strong></p></li><li><p><strong>Spring Boot 3 Java Configuration (all Java, no xml)</strong></p></li><li><p><strong>Spring Boot 3 and Spring MVC</strong></p></li><li><p><strong>Spring Boot 3 Hibernate/JPA CRUD</strong></p></li><li><p><strong>Spring Boot 3 Security</strong></p></li><li><p><strong>Spring Boot 3 REST API</strong></p></li><li><p><strong>Maven</strong></p></li></ul> */}
                </div>
            </div>

        </div>
    )
}

export default OverView

