import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./GlobalLoading.css";
import logoTest from '../../../assets/images/logoBrain.svg'

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);

  return (
    <>
      <div
        style={{
          display: isLoading ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          zIndex: 999,
        }}
      >
        {/* <section className="loading"> */}
          {/* <div className="one"></div> */}
        <section className="loading2">
           <img className="w-[340px]" src={logoTest} alt="" />
  
        </section>
        {/* </section> */}
      </div>
    </>
  );
};

export default GlobalLoading;
