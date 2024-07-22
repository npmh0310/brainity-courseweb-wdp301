import React, { useState, useEffect } from "react";
import "../../../assets/css/payment-success.css";
import Typewriter from "typewriter-effect";
import Confetti from "./Confetti";

const TypewriterEffect = () => {
  return (
    <Typewriter
      options={{
        strings:
          "Thank you for choosing our course! Get ready for an exciting learning journey filled with opportunities for growth and discovery. Happy learning!",
        autoStart: true,
        loop: false,
        deleteSpeed: 50,
        delay: 20,
        cursor: "",
        deleteAll: 20,
      }}
    />
  );
};
const PaymentSuccess = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [typewriter, setTypewriter] = useState(false);
  const [showButton, setShowButton] = useState(false);
  //   const [displayText, setDisplayText] = useState("");
  //   const name =
  //     "Thank you for choosing our course! Get ready for an exciting learning journey filled with opportunities for growth and discovery. Happy learning!";

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       let i = 0;
  //       const typingEffect = setInterval(() => {
  //         if (i < name.length) {
  //           i++;
  //           setDisplayText((prevText) => prevText + name.charAt(i - 1));
  //         } else {
  //           clearInterval(typingEffect);
  //         }
  //       }, 35);

  //       return () => clearInterval(typingEffect);
  //     }, 900);

  //     return () => clearTimeout(timer);
  //   }, [name]);
  useEffect(() => {
    setShowMessage(true);
    const timeout = setTimeout(() => {
      setTypewriter(true);
    }, 1500);
    const buttonTimeout = setTimeout(() => {
      setShowButton(true);
    }, 6500);
    return () => {
      clearTimeout(timeout, buttonTimeout);
    };
  }, []);
  return (
    <>
      <Confetti />
      <section class="pt-[22vh] overflow-x-hidden overflow-y-hidden">
        <div class="container px-4 mx-auto">
          <div class="max-w-3xl mx-auto text-center">
            <span class="inline-block mx-auto mb-6">
              <div class="success-animation">
                <svg
                  class="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    class="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    class="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
            </span>
            <span class="block mb-1 text-xl font-bold text-indigo-500">
              SUCCESS
            </span>
            <h1
              className={`text-4xl font-semibold my-5 ${
                showMessage ? "animate-text-open" : "opacity-0"
              }`}
            >
              <span className="clip-text">PAYMENT SUCCESSFULLY !!!</span>
            </h1>
            {typewriter && (
              <p className="text-xl font-normal mb-12">
                <TypewriterEffect/>
              </p>
            )}

            {showButton && (
              <a
                className="group relative inline-block h-12 w-1/3 xs:w-60 bg-white border-gray-900 border-2 rounded-md animate-fade-in"
                href="/"
              >
                <div className="absolute top-0 left-0 transform -translate-y-1 -translate-x-1 w-full h-full group-hover:translate-y-0 group-hover:translate-x-0 transition duration-300">
                  <div className="flex h-full w-full items-center justify-center bg-primary border-2 border-black rounded-md">
                    <span className="text-base font-black text-black">
                      Back to Home
                    </span>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentSuccess;
