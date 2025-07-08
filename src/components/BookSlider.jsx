import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import BookCard from "./BookCard";
import Loading from "./Loading";
import Error from "./Error";
import useBookData from "../hooks/useBookData";

const BookSlider = React.forwardRef(({ fetchUrl }, ref) => {
  const { books, loading, error } = useBookData(fetchUrl);

  if (loading) return <Loading />;
  if (error) return <Error>{error}</Error>;

  return (
    <section ref={ref} className="py-12 bg-[#fdfdfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="relative overflow-hidden">
          <button className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 -right-4 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition disabled:opacity-50">
            <ChevronRight size={20} />
          </button>
          <button className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 -left-4 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition disabled:opacity-50">
            <ChevronLeft size={20} />
          </button>
          <Swiper
            dir="rtl"
            modules={[Navigation]}
            spaceBetween={10}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {books.map((book) => (
              <SwiperSlide key={book.id}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
});

export default BookSlider;
