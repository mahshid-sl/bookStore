import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import BookCard from "../components/BookCard";
import { ChevronLeft } from "lucide-react";

function AuthorPage() {
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authorId } = useParams();

  useEffect(() => {
    const fetchAuthorData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch author details and their books concurrently
        const [authorRes, booksRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/author/${authorId}`),
          fetch(`${import.meta.env.VITE_API_URL}/books?authorId=${authorId}`),
        ]);

        if (!authorRes.ok) {
          throw new Error("نویسنده مورد نظر یافت نشد.");
        }
        if (!booksRes.ok) {
          throw new Error("خطا در دریافت لیست کتاب‌های نویسنده.");
        }

        const authorData = await authorRes.json();
        const booksData = await booksRes.json();
        console.log(booksData);

        // Manually inject the author data into each book object ---
        const booksWithAuthor = booksData.map((book) => ({
          ...book,
          author: authorData,
        }));

        console.log(booksWithAuthor);
        setAuthor(authorData);
        setBooks(booksWithAuthor); // Set the updated array of books
      } catch (err) {
        console.error(err);
        setError(err.message || "خطا در بارگذاری اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  if (loading) return <Loading />;
  if (error) return <Error>{error}</Error>;
  if (!author)
    return <div className="text-center py-20">نویسنده یافت نشد.</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/*breadcrumb*/}
        <div className="breadcrumb flex text-gray-500 text-sm items-center mb-8 ">
          <Link to="/" className="text-gray-500 hover:text-amber-500">
            خانه
          </Link>
          <span className="mx-2">
            <ChevronLeft size={20} className="mx-1" />
          </span>
          <Link className="font-semibold text-gray-700 ">{author.name}</Link>
        </div>
        {/* Author Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-gray-200 pb-12">
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0">
            <img
              src={author.image}
              alt={author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-right">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {author.name}
            </h1>
            <p className="mt-4 text-gray-600 leading-relaxed">{author.bio}</p>
          </div>
        </div>
        {/* Books by this Author Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-right">
            آثار {author.name}
          </h2>
          {books.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              کتابی از این نویسنده یافت نشد.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthorPage;
