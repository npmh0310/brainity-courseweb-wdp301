import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import IconGoolge from "../assets/svgicon/icons8-google.svg";
import IconFacebook from "../assets/svgicon/icons8-facebook.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { forgotPassword, onRegister } from "../fetchData/User";
import { useSelector } from "react-redux";
import ImgLogin from "../assets/images/logo_noBg.png";
import { Check, CircleCheck } from "lucide-react";

const ForgotPassWord = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('');
    const [show, setShow] = useState(false)

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    };


    const handleClick = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }
        setEmailError('');
     
        const res = await forgotPassword(email)
        if(res.status === 200) {
            setShow(true);
        }
    };



    return (
        <div className="flex w-full  relative bg-white">
            <div className="signin-form w-[524px] my-16 px-12 py-14 mx-auto bg-white rounded-lg border border-gray-200 ">
                <div className=" flex justify-center items-center ">
                    <img
                        src={ImgLogin}
                        className=" size-20"
                        alt="Brainity Logo"
                    />
                </div>
                {show ?
                <div className=" mt-6 flex gap-x-2 bg-primary bg-opacity-85 p-2 ">
                    <CircleCheck className=" size-20 text-black"/>
                    <div className=" text-start px-2">
                        <h1 className=" text-black text-lg font-semibold">
                            Reset password email sent
                        </h1>
                        <p className=" text-sm text-black">
                        You should soon receive an email allowing you to reset your password. Please make sure to check your spam and trash if you can't find the email.
                        </p>
                    </div>
                </div> :
                    <div>
                        <div className="mb-10">
                            <h1
                                className="text-5xl text-primary font-semibold text-center  font-third"
                                id="typing-animation"
                            >
                                Forgot Password
                            </h1>
                        </div>
                        <form action="" className="space-y-6 md:space-y-7">
                            <div className="flex flex-col gap-y-7">
                                <div className="">
                                    <div className="flex flex-row items-center justify-between mb-3">
                                        <label
                                            for="email"
                                            class="block  font-medium text-gray-900 "
                                        >
                                            Email
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder='name@gmail.com'
                                        class="bg-gray-50 border h-12 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {emailError && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {emailError}
                                        </p>
                                    )}
                                </div>

                            </div>
                            <div className="button-login text-center ">
                                <button
                                    onClick={handleClick}
                                    className="btnLogin border hover:bg-[#03ecbe] text-white bg-primary transition  transform hover:scale-105 ]"
                                >
                                    Reset Password
                                </button>
                            </div>
                            <div className="flex flex-row justify-between items-center h-6">
                                <hr className="w-[50%]"></hr>
                                <p className="m-5 text-gray-400">or</p>
                                <hr className="w-[50%]"></hr>
                            </div>
                            <div className="button-login text-center ">
                                <button
                                    onClick={() => navigate('/signin')}
                                    className="btnLogin border hover:bg-opacity-90 text-gray bg-gray-50 transition  transform hover:scale-105 hover:bg-gray-100 ]"
                                >
                                    Back to sign in
                                </button>
                                {/*  */}
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
};

export default ForgotPassWord;
