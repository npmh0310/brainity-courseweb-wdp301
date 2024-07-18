import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getBlogById } from '../../../fetchData/Blog';
import parse from "html-react-parser";
function ReviewBlog() {
    const [blog, setBlog] = useState({
        title: "",
        description: "",
        content: "",
        categories: "",
        imgUrl: ""
    })
    const { id } = useParams();

    const fetchData = async (id) => {
        const res = await getBlogById(id)
        if (res.status === 200) {
            setBlog(res.data.data)
        }

    }
    useEffect(() => {
        fetchData(id)
    }, [id])
    return (
        <div className=" blog-view w-full max-w-6xl p-8 my-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
            <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
                Review Blog
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Title */}
                <div className="sm:col-span-2">
                    <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                        Blog Title
                    </h2>
                    <div className="mt-2">
                        <p className="text-2xl font-bold">{blog.title}</p>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                        Blog Categories
                    </h2>
                    <div className="mt-2 flex gap-x-2">
                        {blog.categories && blog.categories.map((categorie, index) => (<p>/ {categorie.categoryName} </p>))}
                    </div>
                </div>

                <div className="sm:col-span-2">
                    {blog.imgUrl && <img src={blog.imgUrl} alt="" className=' w-full max-h-[450px] object-cover' />}
                </div>
                {/* Description */}
                <div className="sm:col-span-2">
                    <h2 className="block mb-2 text-sm font-medium text-gray-900 ">
                        Blog Description
                    </h2>
                    <p>{blog.description}</p>
                </div>
                <div className="sm:col-span-full">
                    <h2 className="block mb-2 text-sm font-medium text-gray-900 ">
                        Blog Content
                    </h2>
                    {parse(blog.content)}
                </div>

            </div>
        </div>
    )
}

export default ReviewBlog