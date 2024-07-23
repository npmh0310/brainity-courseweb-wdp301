import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import IconGoolge from "../assets/svgicon/icons8-google.svg";
import IconFacebook from "../assets/svgicon/icons8-facebook.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { onRegister } from "../fetchData/User";
import { useSelector } from "react-redux";
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const SignUpPage = () => {
  const signUpData = {
    name: "Sign Up",
    title: "Welcome Back To Brainity",
    subtitle: "Already have an account?",
    userName: {
      name: "User name",
      placeholder: "Enter your user name",
    },
    password: {
      name: "Password",
      placeholder: "••••••••",
    },
    email: {
      name: "Email",
      placeholder: "name@gmail.com",
    },
    notes: [
      "One lowercase character",
      " One uppercase character",
      "   One number",
      "   One special character",
      " 8 characters minimum",
    ],

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
    buttonLogin: "Sign up for free",
    security:
      "By clicking the “Sign up for free” button or using any of the social login options, you are creating an account, and agree to Brain Terms of Service and Privacy Policy",
  };
  const [show, setShow] = useState(false);

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.isLogin);

  if (user) {
    navigate("/");
  }

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    if(valid){

      e.preventDefault();
  
      let res = await onRegister(credentials);
      console.log(res && res.status === 200);
      if (res) {
        navigate("/signin");
      }
    }
  };

  const handleLoginGoogle = () => {
    window.open("http://localhost:4000/auth/google/", "_self");
  };

  const [valid , setValid] = useState(false)
  const [conditions, setConditions] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    minLength: false,
    email: false,
    username: false

  });

  const notes = [
    "One lowercase character",
    "One uppercase character",
    "One number",
    "One special character",
    "8 characters minimum",
    "Email",
    "Username"
  ];
  const validatePassword = (credentials) => {
    const errors = [];
    const conditions = {
      lowercase: /[a-z]/.test(credentials.password),
      uppercase: /[A-Z]/.test(credentials.password),
      number: /[0-9]/.test(credentials.password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(credentials.password),
      minLength: credentials.password.length >= 8,
      email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(credentials.email),
      username: credentials.username.length >= 6
    };

    if (!conditions.lowercase) errors.push(notes[0]);
    if (!conditions.uppercase) errors.push(notes[1]);
    if (!conditions.number) errors.push(notes[2]);
    if (!conditions.specialChar) errors.push(notes[3]);
    if (!conditions.minLength) errors.push(notes[4]);
    if (!conditions.email) errors.push(notes[5])
    if (!conditions.username) errors.push(notes[6])


    setConditions(conditions);

    if (errors.length > 0) {
      return { valid: false, errors: errors };
    }

    return { valid: true, errors: [] };
  };
  useEffect(() => {
    const check = validatePassword(credentials);
    if(check.valid) {
      setValid(true)
    }

}, [credentials]);

  return (
    <>
      {!user && (
        <div className="flex w-full  relative bg-white">
          <div>
            <Link to="/signin" className="absolute top-10 left-10">
              Back to sign in
            </Link>
          </div>
          <div className="signin-form w-[524px] my-16 px-12 py-14 mx-auto bg-white rounded-lg border border-gray-200 ">
            <div className="mb-10">
              <h1
                className="text-5xl text-primary  font-logoTitle"
                id="typing-animation"
              >
                Sign Up
              </h1>
            </div>
            <form action="" className="space-y-6 md:space-y-7">
              <div className="flex flex-col gap-y-7">
                <div className="">
                  <div className="flex flex-row items-center justify-between  mb-3">
                    <label
                      className="block  font-medium text-gray-900 "
                      htmlFor=""
                    >
                      {signUpData.userName.name}
                    </label>
                    <div className="flex items-center text-[13px] gap-x-2">
                      <p>{signUpData.subtitle}</p>
                      <Link
                        className="text-[13px]  text-primary font-medium"
                        to="/signin"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                  <input
                    className="bg-gray-50 border h-12 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus hover:bg-slate-200:border-primary-600 block w-full p-2.5"
                    name="username"
                    type="text"
                    placeholder={signUpData.userName.placeholder}
                    id="username"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <div className="flex flex-row items-center justify-between mb-3">
                    <label
                      for="email"
                      class="block  font-medium text-gray-900 "
                    >
                      {signUpData.email.name}
                    </label>
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder={signUpData.email.placeholder}
                    class="bg-gray-50 border h-12 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <div className="flex flex-row items-center justify-between mb-3">
                    <label
                      for="password"
                      class="block  font-medium text-gray-900 "
                    >
                      {signUpData.password.name}
                    </label>
                    <span
                      onClick={() => setShow(!show)}
                      className="text-[13px] cursor-pointer"
                    >
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
                    id="password"
                    name="password"
                    placeholder={signUpData.password.placeholder}
                    class="bg-gray-50 border h-12 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {notes.map((note, index) => (
                  <li className="list-disc list-inside flex items-center" key={index}>
                    <FontAwesomeIcon
                      icon={conditions[index === 0 ? 'lowercase' :
                        index === 1 ? 'uppercase' :
                          index === 2 ? 'number' :
                            index === 3 ? 'specialChar' :
                              index === 4 ? 'minLength' :
                                index === 5 ? 'email' :
                                  index === 6 ? 'username' :
                                'match'] ? faCheckCircle : faTimesCircle}
                      className={`mr-2 ${conditions[index === 0 ? 'lowercase' :
                        index === 1 ? 'uppercase' :
                          index === 2 ? 'number' :
                            index === 3 ? 'specialChar' :
                              index === 4 ? 'minLength' :
                                index === 5 ? 'email' : 
                                  index === 6 ? 'username' :
                                'match'] ? 'text-green-500' : 'text-red-500'}`}
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </div>

              <div className="button-login text-center ">
                <button
                  onClick={handleClick}
                  className="btnLogin border hover:bg-[#03ecbe] text-white bg-primary transition  transform hover:scale-105 ]"
                  
                >
                  {signUpData.buttonLogin}
                </button>
              </div>
              <div className="flex flex-row justify-between items-center h-6">
                <hr className="w-[50%]"></hr>
                <p className="m-5 text-gray-400">or</p>
                <hr className="w-[50%]"></hr>
              </div>
              <div className="flex flex-col justify-center w-full gap-y-3 xl:flex-col items-center xl:gap-x-4">
                <button
                  onClick={handleLoginGoogle}
                  type="button"
                  className="text-center border border-gray-300   w-full py-3 px-3 rounded-full hover:bg-slate-200 flex justify-center items-center"
                >
                  <img src={IconGoolge} className="w-6 mx-2" alt="" />
                  <p className="text-[13px]"> Sign in with Google</p>{" "}
                </button>

                <button className="text-center border border-gray-300 w-full py-3 px-3 rounded-full hover:bg-slate-200 flex justify-center items-center">
                  <img src={IconFacebook} className="w-6 mx-2" alt="" />
                  <p className="text-[13px]"> Sign in with Facebook</p>{" "}
                </button>
              </div>
              <div className="text-center">
                <span className="text-xs">{signUpData.security}</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpPage;
