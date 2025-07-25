import { Link } from "react-router-dom";
import BookSlider from "./BookSlider";
import { ChevronLeft } from "lucide-react";

function PopularBooks({ ref }) {
  return (
    <section ref={ref} className="py-12 bg-[#fdfdfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className=" flex items-center space-x-1 justify-between text-right mb-10 text-[#333]">
          <div className="flex items-center space-x-1 font-bold">
            <div className="w-2 h-8 bg-amber-500"></div>
            <h1 className="text-sm md:text-xl lg:text-2xl ">
              پرطرفدارترین کتاب ها
            </h1>
          </div>

          <Link className="flex space-x-1 items-center" to={"/popularbook"}>
            <span className="text-sm"> مشاهده همه </span>
            <ChevronLeft size={20} />
          </Link>
        </div>
        <BookSlider
          fetchUrl={`${
            import.meta.env.VITE_API_URL
          }/books?_sort=rating&_order=desc&_limit=10`}
        />
      </div>
    </section>
  );
}

export default PopularBooks;
