import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";

function PopularBooks() {
  const [popularBooks, setPopularBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:8000/books");
        const data = await res.json();

        // filtered(popular-books)
        const filtered = data.filter((book) => book.rating >= 4.8);
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
        <div className=" flex items-center space-x-1 justify-between text-right mb-6 text-[#333]">
          <div className="flex items-center space-x-1  font-bold">
            <div className="w-2 h-7 bg-amber-500 "></div>
            <h1 className="text-2xl"> پرطرفدارترین کتاب ها</h1>
          </div>
          <Link className="flex space-x-1  items-center " to="/popularbook">
            <span className="text-sm"> مشاهده همه </span>
            <ChevronLeft size={20} />
          </Link>
        </div>

        {/* ===list of books===*/}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* ===books card===*/}
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularBooks;
