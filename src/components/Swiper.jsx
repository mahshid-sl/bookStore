// components/OfflineSwiper.jsx
import { useEffect, useRef } from "react";

function OfflineSwiper() {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (window.Swiper) {
      new window.Swiper(swiperRef.current, {
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  }, []);

  return (
    <div className="swiper" ref={swiperRef}>
      <div className="swiper-wrapper">
        <div className="swiper-slide">اسلاید ۱</div>
        <div className="swiper-slide">اسلاید ۲</div>
        <div className="swiper-slide">اسلاید ۳</div>
      </div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
}

export default OfflineSwiper;
