import React, { useEffect, useState } from "react";
import ImgLogin from "../assets/images/logo_noBg.png";
import "../assets/css/login.css";
import IconGoolge from "../assets/svgicon/icons8-facebook.svg";
import IconFacebook from "..//assets/svgicon/icons8-google.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/common/Logo";
import { useDispatch } from "react-redux"
import { onLogin } from "../fetchData/User";
import { loginSuccess } from "../redux/features/authSlice";


function SignInPage() {
  const [displayText, setDisplayText] = useState("");
  const name =
    '"Explore the World of Knowledge with Brainity - Your Premier Platform for Personal Growth! 🚀"';

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i < name.length) {
          i++;
          setDisplayText((prevText) => prevText + name.charAt(i - 1));
        } else {
          clearInterval(typingEffect);
        }
      }, 100);

      return () => clearInterval(typingEffect);
    }, 900); // Chờ 3 giây trước khi bắt đầu hiệu ứng ghi ra từng chữ

    return () => clearTimeout(timer); // Xóa timer nếu component unmount
  }, [name]);

  const signInData = {
    name: "Sign In",
    title: "Welcome Back To Brainity",
    subtitle: "Need an account?",
    userName: {
      name: "User name",
      placeholder: "Enter your user name",
    },
    password: {
      name: "Password",
      placeholder: "••••••••",
    },
    otherLogin: [
      {
        name: "Sign in with Google",
        icon: <FontAwesomeIcon icon={faGoogle} />,
      },
      {
        name: "Sign in with Facebook",
        icon: <FontAwesomeIcon icon={faFacebook} />,
      },
    ],
    buttonLogin: "Log in to your account",
  };

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  };

  const handleClick = async (e) => {
    e.preventDefault()
    let res = await onLogin(credentials);
    
    console.log(res)
    if (res && res.status === 200) {
      dispatch(loginSuccess({
        user: res.data.data,
        isLogin: true
      }));
      navigate('/')
    }

  }

  const handleLoginGoogle = () => {
    window.open("http://localhost:4000/auth/google/", "_self")
  }

  return (
    <div className="w-full m-auto bg-white relative">
      <div className="container-login flex flex-row">
        {/* Left sign in */}
        <div className=" relative lg:flex justify-center hidden items-center flex-1">
          {/* <img className="w-[100%] blur-[10px]" src={ImgLogin} alt="" /> */}
          <div className="image-container mb-[56px] w-[548px] text-[#00457c]">
            <img src={ImgLogin} className="w-[16%]" alt="" />
            <p className="text-2xl font-medium min-h-8">{displayText}</p>
            <h1 className="title mt-3 font-logoTitle">- Brainity</h1>
          </div>
        </div>
        {/* Left sign in */}

        {/* form sign in */}
        <div className=" flex flex-1 flex-col items-center justify-center ">
          <div className="signin-form w-[524px]  px-12 py-14 mx-auto  bg-white rounded-lg ">
            <div className="mb-5">
              <h1
                className=" mb-8 text-5xl text-primary  font-logoTitle"
                id="typing-animation"
              >
                {signInData.name}
              </h1>
            </div>
            <form action="" className="space-y-3 md:space-y-4">
              <div className="mb-5">
                <div className="flex flex-row items-center justify-between  mb-3">
                  <label
                    className="block  font-medium text-gray-900 "
                    htmlFor=""
                  >
                    {signInData.userName.name}
                  </label>
                  <div className="flex items-center text-[13px] gap-x-2">
                    <p>{signInData.subtitle}</p>
                    <Link
                      className="text-[13px]  text-primary font-medium"
                      to="/signup"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
                <input
                  className="bg-gray-50 border h-12 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus hover:bg-slate-200:border-primary-600 block w-full p-2.5"
                  name="username"
                  type="text"
                  placeholder={signInData.userName.placeholder}
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="flex flex-row items-center justify-between mb-3">
                  <label
                    for="password"
                    class="block  font-medium text-gray-900 "
                  >
                    {signInData.password.name}
                  </label>
                  <span onClick={() => setShow(!show)} className="text-[13px]">
                    {show ? (
                      <FontAwesomeIcon icon={faEyeSlash} className="mr-1" />
                    ) : (
                      <FontAwesomeIcon icon={faEye} className="mr-1" />
                    )}
                    {show ? "Hiden" : "Show"}
                  </span>
                </div>
                <input
                  type={`${show ? "text" : "password"}`}
                  name="password"
                  placeholder={signInData.password.placeholder}
                  id="password"
                  class="bg-gray-50 border h-12 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row justify-between items-center h-6">
                <hr className="w-[50%]"></hr>
                <p className="m-5 text-gray-400">or</p>
                <hr className="w-[50%]"></hr>
              </div>
              <div className="flex flex-col justify-center w-full gap-y-3 xl:flex-col items-center xl:gap-x-4">
                <button
                  type="button"
                  className="text-center border border-gray-300   w-full py-3 px-3 rounded-full hover:bg-slate-200 flex justify-center items-center">
                  <img src={IconGoolge} className="w-6 mx-2" alt="" />
                  <p className="text-[13px]"> Sign in with Facebook</p>
                </button>

                <button
                  onClick={handleLoginGoogle}
                  type="button"
                  className="text-center border border-gray-300 w-full py-3 px-3 rounded-full hover:bg-slate-200 flex justify-center items-center"
                >
                  <img src={IconFacebook} className="w-6 mx-2" alt="" />
                  <p className="text-[13px]"> Sign in with Google</p>
                </button>
              </div>
              <div className="flex items-center justify-between h-[40px]">
                <div className="flex justify-center items-center">
                  <div className="flex justify-center items-start h-4">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="/"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <div className="button-login text-center ">
                <button
                  onClick={handleClick}
                  className="btnLogin border hover:bg-[#03ecbe] text-white bg-primary transition  transform hover:scale-105 ]">
                  {signInData.buttonLogin}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* form sign in */}
      </div>
      <div className="absolute top-6 left-10">
        <Link className="flex flex-row items-center" to="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;
