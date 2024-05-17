import React from "react";
import Logo from '../../../assets/images/logo.png'

import { HiOutlineChevronRight } from "react-icons/hi";
import "./footer.css";
const Footer = () => {
  const footer = {
    company: {
      name: "company",
      items: [
        {
          title: "About us",
          link: "/about",
        },
        {
          title: "Blog",
          link: "/blog",
        },
        {
          title: "Buddy Profile",
          link: "/buddyProile",
        },
        {
          title: "Member Ship",
          link: "/member",
        },
      ],
    },
    social: {
      name: "social",
      items: [
        {
          title: "Facebook",
          link: "/",
        },
        {
          title: "Instagram",
          link: "/",
        },
        {
          title: "Git Hub",
          link: "/",
        },
        {
          title: "Twitter",
          link: "/",
        },
      ],
    },
    support: {
      name: "support",
      items: [
        {
          title: "Documentation",
          link: "/",
        },
        {
          title: "Forums",
          link: "/",
        },
        {
          title: "Language Packs",
          link: "/",
        },
        {
          title: "Contact",
          link: "/",
        },
      ],
    },
  };
  return (
    <footer className="bg-primary pt-16 pb-12">
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-20 pb-12 border-b border-black ">
          <div className="mb-5">
            <img src={Logo} className="w-32 lg:w-48" alt="" />
          </div>
          <div className="flex flex-row w-full lg:w-[50%]">
            <div className="flex-grow">
              <div>
                <h1 className="title lg:text-2xl">{footer.company.name}</h1>
              </div>
              <div className="flex flex-col gap-y-3">
                <ul className="space-y-3">
                  {footer.company.items.map((item, index) => {
                    return (
                      <li className="text-md" key={index}>
                        <a className="footer-link" key={index} href={item.link}>
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="flex-grow">
              <div>
                <h1 className="title lg:text-2xl">{footer.social.name}</h1>
              </div>
              <div className="flex flex-col gap-y-3">
                <ul className="space-y-3">
                  {footer.social.items.map((item, index) => {
                    return (
                      <li className="text-md" key={index}>
                        <a className="footer-link" key={index} href={item.link}>
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="flex-grow">
              <div>
                <h1 className="title lg:text-2xl">{footer.support.name}</h1>
              </div>
              <div className="flex flex-col gap-y-3">
                <ul className="space-y-3">
                  {footer.support.items.map((item, index) => {
                    return (
                      <li className="text-md" key={index}>
                        <a className="footer-link" key={index} href={item.link}>
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="title lg:text-2xl">subscribe</h1>
            <p className="text-sm mb-5">
              Join thousands of teachers making a difference everyday
            </p>
            <div className="flex flex-row">
              <input
                className="h-[50px] max-w-[272px] px-6 outline-none placeholder:text-gray-400 text-gray-600 rounded-l-lg "
                type="text"
                placeholder="Enter Email Address"
              />
              <button className="h-[50px] w-[50px] flex justify-center items-center rounded-r-lg bg-slate-300 hover:bg-slate-200">
                <HiOutlineChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-14 text-center">
          <span className="text-lg  font-bold">
            Course Builder | "We're here to support you every step of the way."
          </span>
          <p className="text-sm mt-3 text-gray-500">© Powered by BRAINITY.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
