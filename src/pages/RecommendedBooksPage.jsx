import { Link } from "react-router-dom";
import GridLayout from "../components/GridLayout";
import { ChevronLeft } from "lucide-react";

function RecommendedBooksPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/*breadcrumb*/}
      <div className="breadcrumb flex text-gray-500  text-xs sm:text-sm items-center mb-8 ">
        <Link to="/" className="text-gray-500 hover:text-amber-500">
          خانه
        </Link>
        <span className="mx-2">
          <ChevronLeft size={20} className="mx-1" />
        </span>
        <p className="font-semibold text-gray-700 "> پیشنهاد بوک استور</p>
      </div>
      <h1 className="text-md sm:text-lg md:text-xl font-extrabold text-right mb-8 border-r-4 border-amber-500 pr-4">
        پیشنهاد بوک استور
      </h1>
      <GridLayout
        baseUrl={`${
          import.meta.env.VITE_API_URL
        }/books?rating_gte=4.8&_sort=rating&_order=desc`}
      />
    </section>
  );
}

export default RecommendedBooksPage;
