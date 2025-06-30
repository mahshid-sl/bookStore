import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

import AuthorCard from "./AuthorCard";
import Loading from "./Loading";
import Error from "./Error";

function AuthorCarousel() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:3001/author?_limit=10");
        if (!res.ok) throw new Error("خطا در بارگذاری نویسندگان");
        const authorsData = await res.json();
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setError("خطا در بارگذاری نویسندگان");
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error>{error}</Error>;

  return (
    <section className="py-12 author-carousel-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Swiper
        dir="rtl"
        className="swiper_container"
        modules={[EffectCoverflow, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={20}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        navigation={{
          nextEl: ".next_button",
          prevEl: ".prev_button",
          clickable: true,
        }}
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {authors.map((author) => (
          <SwiperSlide className="swiper_slide" key={author.id}>
            <AuthorCard author={author} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-4 space-x-4">
        <button className="next_button bg-[#ffddb4] rounded-full p-2">
          <ChevronRight size={20} />
        </button>
        <button className="prev_button bg-[#ffddb4] rounded-full p-2">
          <ChevronLeft size={20} />
        </button>
      </div>
    </section>
  );
}

export default AuthorCarousel;
