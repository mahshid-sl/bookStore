// import Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import { heroBooks } from "../data/heroBooks";

function HeroSlider() {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={"fade"}
      fadeEffect={{ crossFade: true }} //
      loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
    >
      {heroBooks.map((book) => (
        <SwiperSlide key={book.id}>
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="absolute top-10 text-center z-10">
              <h3 className="font-semibold text-gray-800 text-lg">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500">{`نوشته: ${book.author}`}</p>
            </div>

            <div className="w-[480px] h-[520px]">
              <img
                src={book.img}
                alt={book.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSlider;
