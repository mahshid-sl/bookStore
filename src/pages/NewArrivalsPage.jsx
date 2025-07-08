import { ChevronLeft } from "lucide-react";
import GridLayout from "../components/GridLayout";
import { Link } from "react-router-dom";

function NewArrivalsPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/*breadcrumb*/}
      <div className="breadcrumb flex text-gray-500 text-sm items-center mb-8 ">
        <Link to="/" className="text-gray-500 hover:text-amber-500">
          خانه
        </Link>
        <span className="mx-2">
          <ChevronLeft size={20} className="mx-1" />
        </span>
        <p className="font-semibold text-gray-700 "> جدیدترین کتاب‌ها</p>
      </div>
      <h1 className="text-3xl font-extrabold text-right mb-8 border-r-4 border-amber-500 pr-4">
        جدیدترین کتاب‌ها
      </h1>
      <GridLayout
        baseUrl={
          "http://localhost:3001/books?_sort=publicationYear&_order=desc"
        }
      />
    </section>
  );
}

export default NewArrivalsPage;
