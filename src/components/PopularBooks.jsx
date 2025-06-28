import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function PopularBooks() {
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:8000/books");
        const data = await res.json();

        // filtered(popular-books)

        const filtered = data.filter((book) => book.rating >= 4.8).slice(0, 6);

        setPopularBooks(filtered);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBooks();
  }, []);

  return (
    <section className="py-12 bg-[#fdfdfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex items-center space-x-1 justify-between text-right mb-10 text-[#333]">
          <div className="flex items-center space-x-1  font-bold">
            <div className="w-2 h-10 bg-amber-500 "></div>
            <h1 className="text-2xl"> پرطرفدارترین کتاب ها</h1>
          </div>
          <Link className="flex space-x-1  items-center" to="/popularbook">
            <span className="text-sm"> مشاهده همه </span>
            <ChevronLeft size={20} />
          </Link>
        </div>

        <div className="relative">
          <button className="swiper-button-prev-custom absolute top-1/2 -right-4 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition">
            <ChevronRight size={20} />
          </button>

          <button className="swiper-button-next-custom absolute top-1/2 -left-4 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition">
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
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {popularBooks.map((book) => (
              <SwiperSlide book={book} key={book.id}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default PopularBooks;
