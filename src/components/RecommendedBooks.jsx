import { ChevronLeft, ChevronsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecommendedBookCard from "./RecommendedBookCard";
import Loading from "./Loading";
import Error from "./Error";

function RecommendedBooks() {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch recommended books from an API or other source
    const fetchRecommendedBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const [recBooks, author] = await Promise.all([
          fetch(
            "http://localhost:3001/books?rating_gte=4.8&_sort=rating&_order=desc&_limit=4"
          ),
          fetch("http://localhost:3001/author"),
        ]);

        const recBooksData = await recBooks.json();
        const recAuthorData = await author.json();

        // Create a map of authors by their ID
        const authorMap = new Map(
          recAuthorData.map((author) => [author.id, author])
        );
        // combine books and authors
        const combinedData = recBooksData.map((book) => {
          const author = authorMap.get(book.authorId);
          return { ...book, author };
        });

        setRecommendedBooks(combinedData);
      } catch (error) {
        console.error(error);
        setError("خطا در بارگزاری داده ها");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedBooks();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <section className="py-12 bg-[#fdfdfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className=" flex items-center space-x-1 justify-between text-right mb-10 text-[#333]">
          <div className="flex items-center space-x-1 font-bold">
            <div className="w-2 h-8 bg-amber-500"></div>
            <h1 className="text-sm md:text-xl lg:text-2xl ">معرفی کتاب</h1>
          </div>

          <Link className="flex space-x-1 items-center" to={"/popularbook"}>
            <span className="text-sm"> مشاهده همه </span>
            <ChevronLeft size={20} />
          </Link>
        </div>
      </div>

      <div
        className="
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
        grid grid-cols-1 
      sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8"
      >
        {/* Book items go here */}
        {recommendedBooks.map((book) => (
          <RecommendedBookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

export default RecommendedBooks;
