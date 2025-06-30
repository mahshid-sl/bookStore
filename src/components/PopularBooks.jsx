import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BeatLoader } from "react-spinners";

// import swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import BookCard from "./BookCard";
import Loading from "./Loading";
import Error from "./Error";

function PopularBooks() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const fetchAndCombineData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1: Fetch the list of books and authors
        const [booksRes, authorsRes] = await Promise.all([
          fetch(
            "http://localhost:3001/books?_sort=rating&_order=desc&_limit=10"
          ),
          fetch("http://localhost:3001/author"),
        ]);

        if (!booksRes.ok || !authorsRes.ok) {
          throw new Error("خطا در ارتباط با سرور");
        }

        const booksData = await booksRes.json();
        const authorsData = await authorsRes.json();

        // Step 2: Create a Map of authors for quick lookup
        // This allows for finding an author quickly instead of repeatedly searching an array
        const authorsMap = new Map(
          authorsData.map((author) => [author.id, author])
        );

        // Step 3: Join the data
        // We add the complete author object to each book
        const combinedBooks = booksData.map((book) => ({
          ...book,
          author: authorsMap.get(book.authorId),
        }));

        setPopularBooks(combinedBooks);
      } catch (error) {
        console.error(error.message);
        setError("خطا در بارگذاری داده‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchAndCombineData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error>{error}</Error>;

  return (
    <section className="py-12 bg-[#fdfdfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className=" flex items-center space-x-1 justify-between text-right mb-10 text-[#333]">
          <div className="flex items-center space-x-1 font-bold">
            <div className="w-2 h-8 bg-amber-500"></div>
            <h1 className="text-2xl"> پرطرفدارترین کتاب ها</h1>
          </div>
          <Link className="flex space-x-1  items-center" to="/popularbook">
            <span className="text-sm"> مشاهده همه </span>
            <ChevronLeft size={20} />
          </Link>
        </div>

        <div className="relative">
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
            {popularBooks.map((book) => (
              <SwiperSlide key={book.id}>
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
