import { Link } from "react-router-dom";
import BookSlider from "./BookSlider";
import { ChevronLeft } from "lucide-react";

function NewestBooks() {
  return (
    <section className="py-12 ">
      {/* mobile view===== */}
      <div className=" flex items-center space-x-1 justify-between text-right mb-10 text-[#333] px-4 md:hidden">
        <div className="flex items-center space-x-1 font-bold">
          <div className="w-2 h-8 bg-amber-500"></div>
          <h1 className="text-sm md:text-xl ">جدیدترین کتاب ها</h1>
        </div>

        <Link className="flex space-x-1 items-center" to={"/newbook"}>
          <span className="text-sm"> مشاهده همه </span>
          <ChevronLeft size={20} />
        </Link>
      </div>

      {/* tablet and desktop view===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8">
        <div
          className="hidden md:flex bg-black p-4 rounded-tl-2xl rounded-bl-2xl flex-shrink-0 outline-2
        outline-amber-500
        outline-offset-4 "
        >
          <div
            className="flex flex-col items-center justify-between lg:w-56 
        h-72 md:w-48 "
          >
            <h2 className="text-xl font-bold text-white flex gap-2">
              <span className="bg-[#f59e0b] text-black">جدیدترین</span>
              کتاب ها
            </h2>
            <img
              className="w-28 h-28 object-cover"
              src="./images/newBook1.png"
              alt="جدیدترین کتاب ها"
            />
            <Link
              to={"/newbook"}
              className="text-white flex gap-1 items-center"
            >
              مشاهده همه
              <ChevronLeft color="#f59e0b" />
            </Link>
          </div>
        </div>

        <div className="flex-grow min-w-0">
          <BookSlider
            fetchUrl={`${
              import.meta.env.VITE_API_URL
            }/books?_sort=publicationYear&_order=desc&_limit=5`}
          />
        </div>
      </div>
    </section>
  );
}

export default NewestBooks;
