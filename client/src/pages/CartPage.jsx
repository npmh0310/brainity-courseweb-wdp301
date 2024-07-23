import React, { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import { Button } from "flowbite-react";
import ItemInCart from "../components/User/CartPage/ItemInCart";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  getCourseLaterInCart,
  getCoursesInCart,
} from "../redux/features/cartSlice";
import { formatCurrencyVND } from "../function/function";

import { createPayment } from "../fetchData/Course";
import { redirect } from "react-router-dom";

import cartEmpty from "../assets/images/cartEmpty.png";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courseInCart = useSelector(getCoursesInCart);
  const courseLateInCart = useSelector(getCourseLaterInCart);
  const total = courseInCart
    ? courseInCart.reduce((sum, data) => sum + data.course.price, 0)
    : 0;

  const handleCheckout = async () => {
    const res = await createPayment(total, "cartne", "hongcocourseIddau");
    if (res) {
      window.open(res.data.url, "_self");
    }
  };

  return (
    <div className=" max-w-[1440px]  mx-auto px-10 pb-24  animate-open">
      <h1 className=" mt-8 text-4xl font-bold text-[#2d2f31] text-start">
        Shopping Cart
      </h1>
      <div className=" flex flex-col lg:flex-row mb-4">
        <div
          className={`${
            courseInCart && courseInCart.length > 0 ? "lg:w-9/12" : "lg:w-full"
          } w-full`}
        >
          <div className=" mt-8 flex flex-col gap-y-4">
            <h3 className=" font-semibold mb-2">
              {courseInCart && courseInCart.length} Course in Cart
            </h3>
            {courseInCart && courseInCart.length > 0 ? (
              courseInCart.map((data, index) => (
                <ItemInCart
                  course={data.course}
                  later={data.later}
                  key={index}
                />
              ))
            ) : (
              <div className="h-[382px] flex flex-col items-center   border border-spacing-1 rounded-sm overflow-hidden">
                <img
                  className="object-cover h-[230px] w-[230px]"
                  src={cartEmpty}
                  alt=""
                />
                <div>
                  <h1 className="my-6">
                    Your cart is empty. Keep shopping to find a course!
                  </h1>{" "}
                  <button
                    className="cta flex flex-row items-center"
                    onClick={() => navigate("/categories")}
                  >
                    <span>See all course</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className=" mt-8 flex flex-col gap-y-4">
            <h3 className=" font-semibold mb-2">
              {courseLateInCart && courseLateInCart.length} Course for Later
            </h3>
            {courseLateInCart &&
              courseLateInCart.map((data, index) => (
                <ItemInCart
                  course={data.course}
                  later={data.later}
                  key={index}
                />
              ))}
          </div>
        </div>
        <div
          className={`${
            courseInCart && courseInCart.length > 0
              ? "lg:w-3/12 animate-transCourse"
              : " hidden animate-bounce"
          }  lg:w-3/12 pl-6 w-full flex flex-col items-start py-4`}
        >
          <div className=" mt-8 mb-4 text-start">
            <h3 className=" text-third font-semibold mb-4">Total:</h3>
            <h2 className=" text-3xl text-gray-600 font-secondary font-semibold">
              {formatCurrencyVND(total)}
            </h2>
          </div>
          <button
            className="px-4 py-3 rounded-none w-full bg-primary hover:bg-opacity-80 "
            color="success"
            onClick={handleCheckout}
          >
            <span className=" text-white  font-bold tracking-wider uppercase ">
              Checkout
            </span>
          </button>
          <div className=" my-4 w-full border-y"></div>
          <div className=" w-full">
            <h3 className=" text-third font-semibold mb-4">Promotions</h3>
            <div className=" flex">
              <input
                type="text"
                placeholder="Enter Coupon"
                className=" w-11/12 px-2 py-1 border border-black border-r-0 text-sm"
              />
              <Button className=" px-2 py-1 rounded-none bg-primary border-primary hover:bg-opacity-80">
                <span className=" text-white text-sm font-bold">Apply</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
