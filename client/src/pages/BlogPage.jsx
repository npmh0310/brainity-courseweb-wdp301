import React, { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import BlogBg from "../assets/images/Blog/blogbg2.jpg";
import { BlogData } from "../components/User/BlogPage/BlogData";

import { Link } from "react-router-dom";
import { getAllBlog } from "../fetchData/Blog";
import { formatDate, formatDate2 } from "../function/function";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    const res = await getAllBlog();
    if (res.status === 200) {
      setBlogs(res.data.blogs);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white text-third pb-16">
      <div className="w-full bg-white items-center ">
        <div
          className="w-10/12 mx-auto h-[350px] relative object-bottom lg:shrink-0"
          style={{
            backgroundImage: `url(${BlogBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        >
          <div className="text-white italic font-extrabold text-7xl absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/">
            Blog
          </div>
          <div className="absolute bottom-0 left-12 right-12 bg-white h-12"></div>
        </div>
        {/* content */}

        <div className="container mx-auto px-4 lg:px-32">
          <div className="pt-4">
            <ul className="flex gap-12 font-extrabold italic pb-6">
              <li className="hover:text-primary">
                <Link to="/blogpage">All blogs</Link>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  React JS
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Node JS
                </a>
              </li>
            </ul>
          </div>
          {blogs.map((blog, index) => (
            <div className="py-8" key={index}>
              <div className="flex flex-col lg:flex-row flex-1">
                <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-4 lg:mb-0">
                  <Link to={`/blogdetail/${blog._id}/`}>
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
                      <img
                        src={blog.author.avatar}
                        className=" w-10 h-10 object-cover rounded-full"
                        alt=""
                      />
                      <div className="block ml-4 text-xs lg:text-sm">
                        <p>{blog.author.name}</p>
                        <div className="flex gap-2 lg:gap-4">
                          <li className="list-none">
                            {formatDate2(blog.createdAt)}
                          </li>
                        </div>
                      </div>
                    </div>
                    <div className="self-start lg:self-center">
                      <Share2 size="16px" className="lg:size-20px" />
                    </div>
                  </div>
                  {/* Content Blog */}
                  <div className="border-b-2 pt-2 pb-2">
                    <Link to={`/blogdetail/${blog._id}/`}>
                      <p className="font-extrabold  text-xl lg:text-3xl hover:text-primary pb-4 text-left">
                        {blog.title}
                      </p>
                    </Link>
                    <h3 className="text-sm lg:text-base">{blog.description}</h3>
                  </div>
                  {/* Footer Blog */}
                  <div className="flex pt-2 justify-between">
                    <ul className="flex gap-2 lg:gap-4 text-xs lg:text-base">
                      <li>{blog.comments.length} comments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
