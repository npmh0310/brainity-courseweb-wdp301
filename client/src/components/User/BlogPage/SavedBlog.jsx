import React, { useState } from "react";
import { BlogData } from "./BlogData";
import { Bookmark } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import BlogBg from "../../../assets/images/design.jpg";

const SavedBlog = () => {
  return (
    <div className="mx-auto block text-third">
      <div className="text-center text-6xl font-bold py-8">Saved blog</div>

      <div className="block mx-4 sm:mx-12 md:mx-20 lg:mx-52">
        {BlogData.map((blog, index) => (
          <div className="py-4 sm:py-6 md:py-8" key={index}>
            <div className="flex flex-col lg:flex-row flex-1">
              <div className="w-full lg:w-1/3 pr-0 lg:pr-8 mb-4 lg:mb-0 items-center">
                <Link to={`/blogdetail/${blog.id}/`}>
                  <img
                    src={blog.image}
                    alt="img"
                    className="h-52 sm:h-56 md:h-64 lg:h-fit w-fit sm:w-full md:w-full"
                  />
                </Link>
              </div>

              <div className="w-full lg:w-2/3">
                {/* Header Blog */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 lg:mb-0">
                  <div className="flex items-center mb-2 lg:mb-0">
                    <CgProfile className="text-2xl lg:text-4xl" />
                    <div className="block ml-4 text-xs sm:text-sm lg:text-base">
                      <p>Admin</p>
                      <div className="flex gap-2 lg:gap-4">
                        <li className="list-none">May 21, 2024</li>
                        <li>1 min</li>
                      </div>
                    </div>
                  </div>
                  <div className="self-start lg:self-center mr-4">
                    <Bookmark
                      size="20px"
                      className="lg:size-20px cursor-pointer"
                      fill="yellow"
                    />
                  </div>
                </div>
                {/* Content Blog */}
                <div className="border-b-2 pt-2 pb-2">
                  <Link to={`/blogdetail/${blog.id}/`}>
                    <p className="font-extrabold text-lg sm:text-xl lg:text-2xl hover:text-primary pb-4 text-left">
                      {blog.content}
                    </p>
                  </Link>
                  <h3 className="text-xs sm:text-sm lg:text-base">
                    {blog.script}
                  </h3>
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

export default SavedBlog;
