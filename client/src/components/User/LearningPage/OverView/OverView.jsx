
import React from 'react'
import Star from '../../../../assets/images/star.png'
import { Flag } from 'lucide-react'
function OverView() {
    return (
        <div className=' px-4 flex flex-col w-full mx-auto'>
            <h1 className=' mb-6 text-2xl text-[#2D2F31]'>[NEW] Spring Boot 3, Spring 6 & Hibernate for Beginners </h1>
            <div className=' flex justify-start items-center mb-4 '>
                <div className=' flex flex-col  items-start'>
                    <div className=' flex justify-center items-center gap-2'>
                        <span className=' font-semibold'>4.6</span>
                        <img src={Star} alt="" className=' w-4 h-4 object-cover' />
                    </div>
                    <span className=' text-[#6a6f73] text-[12px]'>81,644 ratings</span>
                </div>
                <div className=' flex flex-col  items-start ml-8'>
                    <div className=' flex justify-center items-center gap-2'>
                        <span className=' font-semibold'>376,633</span>
                    </div>
                    <span className=' text-[#6a6f73] text-[12px]'>Students</span>
                </div>
                <div className=' flex flex-col  items-start ml-8'>
                    <div className=' flex justify-center items-center gap-2'>
                        <span className=' font-semibold'>33.5 hours</span>
                    </div>
                    <span className=' text-[#6a6f73] text-[12px]'>Total</span>
                </div>
            </div>
            <div className='  flex justify-start items-center mb-4'>
                <Flag size={12} className=' mr-2' />
                <span className=' text-[12px]'>Last updated May 2024</span>
            </div>
            <div className='p-6 flex items-start border-t'>
                <div className=' w-2/12 text-sm text-start'>
                    Description
                </div>
                <div className=' w-10/12 text-sm font-semibold '>
                    <p><strong>NEW FOR SPRING BOOT 3 AND SPRING 6</strong></p>
                    <p><strong>POPULAR IDE - IntelliJ (free version)</strong></p>
                    <p><strong>#1 BEST SELLING SPRING BOOT &amp; HIBERNATE&nbsp;COURSE ON UDEMY - 350,000+ STUDENTS ENROLLED</strong></p>
                    <p><strong>OVER 78,000 REVIEWS - 5 STARS! </strong></p>
                    
                    <p><strong>THIS COURSE COVERS SPRING BOOT 3 AND SPRING 6</strong></p>
                    <p><strong>LEARN these HOT TOPICS in Spring Boot 3 and Spring 6:</strong></p>
                    <ul><li><p><strong>Spring Boot 3</strong></p></li><li><p><strong>Spring Framework 6</strong></p></li><li><p><strong>Spring Boot 3 Core</strong></p></li><li><p><strong>Spring Boot 3 Annotations</strong></p></li><li><p><strong>Spring Boot 3 Java Configuration (all Java, no xml)</strong></p></li><li><p><strong>Spring Boot 3 and Spring MVC</strong></p></li><li><p><strong>Spring Boot 3 Hibernate/JPA CRUD</strong></p></li><li><p><strong>Spring Boot 3 Security</strong></p></li><li><p><strong>Spring Boot 3 REST API</strong></p></li><li><p><strong>Maven</strong></p></li></ul>
                </div>
            </div>

        </div>
    )
}

export default OverView

