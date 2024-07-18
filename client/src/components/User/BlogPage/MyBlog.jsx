import React, { useEffect, useState } from "react";
import { BlogData } from "./BlogData";
import { Share2, Trash2 } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import BlogBg from "../../../assets/images/Categories/bg3.jpg";
import { getBlogUser } from "../../../fetchData/Blog";
import { formatDate2 } from "../../../function/function";
import toast from "react-hot-toast";

const MyBlog = () => {
  const [blogs, setBlogs] = useState([])

  const fetchData = async () => {
    const res = await getBlogUser()
    if (res.status === 200) {
      setBlogs(res.data)
    }
  }

  const deleteBlog = async (blogId) => {
    const res = await deleteBlog(blogId)
    if(res.status === 200){
      toast.success('Delete blog success')
      fetchData()
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="mx-auto block text-third">
      <div className="text-center text-6xl font-bold py-8">My blog</div>
      <div className="block mx-4 sm:mx-12 md:mx-20 lg:mx-52">
        {blogs.map((blog, index) => (
          <div className="py-8" key={index}>
            <div className="flex flex-col lg:flex-row flex-1">
              <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-4 lg:mb-0">
                <Link to={`/myblog/${blog.id}/`}>
                  <img
                    src={blog.imgUrl}
                    alt="img"
                    className="h-40 lg:h-60 w-full object-cover"
                  />
                </Link>
              </div>

              <div className="w-full lg:w-1/2">
                {/* Header Blog */}
                <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 lg:mb-0">
                  <div className="flex items-center">
                    {/* <CgProfile className="text-2xl lg:text-4xl" /> */}
                    <img src={blog.author.avatar} className=" w-10 h-10 object-cover rounded-full" alt="" />
                    <div className="block ml-4 text-xs lg:text-sm">
                      <p>{blog.author.name}</p>
                      <div className="flex gap-2 lg:gap-4">
                        <li className="list-none">{formatDate2(blog.createdAt)}</li>
                      </div>
                    </div>
                  </div>
                  <div className="self-start lg:self-center mr-4 cursor-pointer hover:text-primary">
                    <Trash2 size="20px" className="lg:size-20px" />
                  </div>
                </div>
                {/* Content Blog */}
                <div className="border-b-2 pt-2 pb-2">
                  <Link to={`/myblog/${blog._id}/`}>
                    <p className="font-extrabold  text-xl lg:text-3xl hover:text-primary pb-4 text-left">
                      {blog.title}
                    </p>
                  </Link>
                  <h3 className="text-sm lg:text-base">{blog.description}</h3>
                </div>
                {/* Footer Blog */}
                <div className="flex pt-2 justify-between">
                  <ul className="flex gap-2 lg:gap-4 text-xs lg:text-base">
                    <li>0 views</li>
                    <li>0 comments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlog;
