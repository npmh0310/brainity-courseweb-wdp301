import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slide.css";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const SlideProduct = () => {
  const products = [
    {
      id: 1,
      img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/fe/30e66c026241778e08c7f6bc5e8bee/200392-Image.png?auto=format%2Ccompress%2C%20enhance&dpr=1&w=265&h=204&fit=crop&q=50",
      name: "Product 1",
      actor: "Actor 1",
      price: "$10.00",
    },
    {
      id: 2,
      img: "https://i.ytimg.com/vi/ir8z2HUOp_0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBwVnqi5ydqvIZWxApwjOtC3tPupA",
      name: "Product 2",
      actor: "Actor 2",
      price: "$20.00",
    },
    {
      id: 3,
      img: "https://i.ytimg.com/vi/Vn-_AIORLlo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCcUyIH_uY4oynJ_Ccd4PKCaxpY-A",
      name: "Product 3",
      actor: "Actor 3",
      price: "$30.00",
    },
    {
      id: 4,
      img: "https://i.ytimg.com/vi/iSx3LIRKz_4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDWCD8m72xGq_Fc4xHIFvMFIOXTKA",
      name: "Product 4",
      actor: "Actor 4",
      price: "$40.00",
    },
    {
      id: 5,
      img: "https://i.ytimg.com/vi/ir8z2HUOp_0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBwVnqi5ydqvIZWxApwjOtC3tPupA",
      name: "Product 5",
      actor: "Actor 5",
      price: "$20.00",
    },
  ];
  useEffect(() => {
    AOS.init({ duration: 1400, once: true });
  }, []);
  return (
    <section className="py-28 my-auto ">
      <div className="my-8 flex flex-col gap-y-8">
        <h1
          className="block text-center text-7xl uppercase font-bold font-third text-primary "
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Best Seller
        </h1>
        <span
          className="max-x-[639px] mx-auto mb-[30px] lg:mb-[30px] text-center text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          "Exploring the Top 5 Most Popular Courses That Are Flying Off the
          Shelves"
        </span>
      </div>
      <div
        className="px-4 lg:px-36 mx-auto"
        data-aos="zoom-in"
        data-aos-delay="500"
      >
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container h-7"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div
                className="product-bestseller group relative rounded-[32px] overflow-hidden shadow-md"
                style={{
                  backgroundImage: `url(${product.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="absolute inset-0 flex flex-col justify-center items-center text-white gap-y-3 rounded-[32px] p-4"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top,rgba(0, 40, 73, 0.7), rgba(130, 181, 143, 0.3))",
                    backdropFilter: "blur(3px)",
                  }}
                >
                  <h3 className="text-2xl text-white font-bold drop-shadow-lg uppercase text-center tracking-wide">
                    {product.name}
                  </h3>
                  <p className=" text-white flex items-center italic gap-1">
                    By {product.actor}
                  </p>
                  <p className="font-semibold text-white drop-shadow-lg flex items-center gap-1 absolute top-0 right-0 px-5 py-3 bg-[#f69113] rounded-bl-[32px] mb-4">
                    {product.price}
                  </p>
                  <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                    <div className="rounded-[32px] object-cover w-full h-full bg-black opacity-0 group-hover:opacity-40 "></div>
                    <button className="  absolute  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  bg-[#f69113] border-2 border-[#ffb513] rounded-3xl text-sm font-semibold text-white w-60 py-3 uppercase hover:border-[#fff] cursor-pointer">
                      Show course
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="slider-controller">
            {/* <div className="swiper-button-prev slider-arrow ">
              <ChevronLeft
                size={40}
                className="text-primary"
                name="arrow-back-outline"
              />
            </div>
            <div className="swiper-button-next slider-arrow">
              <ChevronRight
                size={40}
                className="text-primary"
                name="arrow-forward-outline"
              />
            </div> */}
            <div className="swiper-pagination "></div>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default SlideProduct;
