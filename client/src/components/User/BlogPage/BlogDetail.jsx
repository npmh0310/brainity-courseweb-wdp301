import { CgProfile } from "react-icons/cg";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import {
  Eye,
  MessageCircleMore,
  Heart,
  Share2,
  Facebook,
  Twitter,
  Link2,
} from "lucide-react";
import BlogBg from "../../../assets/images/Blog/blogbg2.jpg";
import { BlogData } from "./BlogData";
import { getBlogById } from "../../../fetchData/Blog";
import { useEffect, useState } from "react";
import { formatDate2 } from "../../../function/function";

function BlogDetail() {

  const [blog, setBlog] = useState()
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
    <div className="bg-white text-third">
      {/* Blog content */}
      <div className="w-full bg-white items-center">
        {/* content */}
        <div
          className="w-10/12 mx-auto h-[350px] relative object-bottom lg:shrink-0"
          style={{
            backgroundImage: `url(${BlogBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        >
          <div className="text-white italic font-extrabold text-6xl absolute inset-y-1/3 inset-x-1/2 lg:inset-x-1/2">
            Blog
          </div>
          <div className="absolute bottom-0 left-12 right-12 bg-white h-12"></div>
        </div>
        <div className="container mx-auto bg-white px-4 lg:px-32">
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

          <div>
            {blog && 
              <div>
                <div className="flex lg:flex-row justify-between mb-4 lg:mb-8">
                  <div className="flex items-center gap-3 mb-4 lg:mb-0">
                  <img src={blog.author.avatar} className=" w-10 h-10 object-cover rounded-full" alt="" />
                    <div className="flex gap-2 lg:gap-4 text-xs lg:text-sm">
                      <li className="list-none">{blog.author.name}</li>
                      <li>{formatDate2(blog.createdAt)}</li>
                    </div>
                  </div>
                  <div className="">
                    <Share2
                      size="16px"
                      className="lg:size-20px mr-0 lg:mr-20"
                    />
                  </div>
                </div>

                <div className="block pt-8">
                  <div className="pb-8 border-b-2">
                    <h1 className="font-bold text-1xl lg:text-3xl pb-4 lg:pb-8 text-left italic">
                      {blog.title}
                      {/* {parse(blog.content)} */}
                    </h1>
                    <p className="font-medium text-base lg:text-lg pb-4 lg:pb-8 text-left">
                      {blog.description}
                    </p>
                    <img
                      src={blog.imgUrl}
                      alt="img"
                      className="w-full lg:w-1/2 h-auto mx-auto pb-4 lg:pb-8"
                    />
                    {/* <p className="font-bold text-lg lg:text-1xl text-left italic pb-4 lg:pb-8">
                      {parse(blog.content)}
                    </p> */}
                    <p className="pb-4 lg:pb-8 text-sm lg:text-base">
                    {parse(blog.content)}
                    </p>
                    {/* <h3 className="font-bold text-xl lg:text-3xl text-left italic pb-4 lg:pb-8">
                      Next content
                    </h3>
                    <p className="pb-4 lg:pb-8 text-sm lg:text-base">
                      Lorem ipsum dolor sit amet consectetur, adipisicing
                      elit. Temporibus, optio dolor eligendi perferendis
                      eveniet unde in? Blanditiis, porro sequi eaque illum
                      quod aut impedit explicabo dolorum, tenetur nulla cumque
                      odit.Lorem ipsum, dolor sit amet consectetur adipisicing
                      elit. Alias ad provident laborum quod ducimus eligendi
                      consequatur aperiam! Libero ratione ut quibusdam
                      doloremque deserunt illo sapiente perspiciatis hic,
                      laborum laboriosam saepe.
                    </p> */}
                  </div>
                  {/* blogFooter */}
                  <div className="flex  justify-between border-b-2 mt-4 pb-4">
                    <div className="flex gap-4 mb-4 lg:mb-0">
                      <Facebook size="20px" fill="blue" stroke="0" />
                      <Twitter size="20px" strokeWidth={2} />
                      <Link2 size="20px" strokeWidth={2} />
                    </div>
                    <div className="flex gap-2 lg:gap-4 text-xs lg:text-base">
                      <li className="list-none">Feature</li>
                      <li>Feature</li>
                    </div>
                  </div>
                  {/* blogShare */}
                  <div className="flex py-4 justify-between">
                    <ul className="flex gap-2 lg:gap-4 text-xs lg:text-base">
                      <li>0 views</li>
                      <li>0 comments</li>
                    </ul>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      {/* Recent Blog */}
      <div className="py-12 lg:py-24 mx-4 lg:mx-60">
        <div className="flex flex-col lg:flex-row justify-between pb-4">
          <p className="text-base lg:text-lg font-semibold">Recent Blogs</p>
          <Link to="/blogpage">
            <p className="font-light hover:text-primary text-sm lg:text-base">
              See all
            </p>
          </Link>
        </div>
        {/* Recent Blog Show */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BlogData.filter((blog) => blog.id !== parseInt(id))
            .slice(0, 3)
            .map((blog, index) => (
              <div className="block w-full h-auto" key={index}>
                <Link to={`/blogdetail/${blog.id}/`}>
                  <img
                    src={blog.image}
                    alt="img"
                    className="h-40 w-full mb-4 cursor-pointer object-cover"
                  />
                </Link>
                <div className="font-bold text-lg lg:text-xl pb-2 pl-2 text-left text-pretty italic border-b-2 h-16 hover:text-primary">
                  <a href="#">{blog.content}</a>
                </div>
                <div className="flex pt-2 justify-between">
                  <ul className="flex gap-4 text-xs lg:text-base">
                    <li className="flex gap-2 items-center">
                      <Eye size="16px" />0
                    </li>
                    <li className="flex gap-2 items-center">
                      <MessageCircleMore size="16px" />0
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mx-4 lg:mx-[300px]">
        <p className="font-bold text-lg lg:text-xl text-left text-pretty italic border-b-2 pb-2">
          Comments
        </p>
        <div className="w-full pt-4 lg:pt-8 pb-10 lg:pb-20 px-2">
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border-2">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-[#03ecbe] text-white px-4 lg:px-[40px] py-2 lg:py-[9px] my-1 lg:my-1 transition-transform duration-200 ease-in-out transform hover:scale-105 rounded-full hidden md:flex text-sm font-semibold"
            >
              Post comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
