import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import {
  BookOpenText,
  ChevronLeft,
  FileAudio,
  HeartIcon,
  MessageCircleQuestion,
  Star,
} from "lucide-react";
import BookTabs from "../components/BookTabs";
import { useCart } from "../contexts/CartContext";

function BookDetails() {
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [error, setError] = useState(null);
  const { bookId } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [bookRes, commentRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/books/${bookId}`),
          fetch(`${import.meta.env.VITE_API_URL}/comments?bookId=${bookId}`),
        ]);
        if (!bookRes.ok) throw new Error("کتاب مورد نظر یافت نشد.");
        if (!commentRes.ok) throw new Error("نظرات کتاب یافت نشد.");

        const commentData = await commentRes.json();
        const bookData = await bookRes.json();
        setComments(commentData);

        if (bookData.authorId) {
          const authorRes = await fetch(
            `${import.meta.env.VITE_API_URL}/author/${bookData.authorId}`
          );
          if (!authorRes.ok) {
            throw new Error("نویسنده کتاب یافت نشد.");
          }
          const authorData = await authorRes.json();
          setBook({ ...bookData, author: authorData });
        } else {
          setBook(bookData);
        }

        //  slug
        const createSlug = (text) => text.replace(/\s+/g, "-").toLowerCase();

        const path = [{ name: "خانه", path: "/" }];

        // type of book
        const bookType = bookData.isAudiobook ? "audiobooks" : "ebooks";
        const bookTypeName = bookData.isAudiobook
          ? "کتاب صوتی"
          : "کتاب الکترونیک";

        path.push({ name: bookTypeName, path: `/${bookType}` });

        // category
        if (bookData.category) {
          path.push({
            name: bookData.category,
            path: `/${bookType}/${createSlug(bookData.category)}`,
          });
        }

        if (bookData.category && bookData.subcategory) {
          path.push({
            name: bookData.subcategory,
            path: `/${bookType}/${createSlug(bookData.category)}/${createSlug(
              bookData.subcategory
            )}`,
          });
        }
        path.push({ name: bookData.title, path: null }); //آخرین آیتم لینک ندارد
        setBreadcrumbs(path);
      } catch (err) {
        console.error(err);
        setError(err.message || "خطا در بارگذاری داده‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [bookId]);

  // Handle new comment submission
  const handleCommentSubmit = async (newComments) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComments),
      });

      if (!response.ok) {
        throw new Error("خطا در ثبت نظر");
      }

      const savedComment = await response.json();
      setComments((prevComments) => [...prevComments, savedComment]);
    } catch (error) {
      console.error(error);
      setError(error.message || "خطا در ثبت نظر");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error>{error}</Error>;
  if (!book)
    return (
      <div className="text-center py-20">کتابی برای نمایش وجود ندارد.</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex text-xs sm:text-sm text-gray-500 mb-8 items-center flex-wrap space-y-1">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {crumb.path ? (
              <Link to={crumb.path} className="hover:text-amber-500">
                {crumb.name}
              </Link>
            ) : (
              <span className="font-semibold text-gray-700">{crumb.name}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <ChevronLeft size={20} className="mx-1" />
            )}
          </div>
        ))}
      </nav>

      {/* book details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {/* right-col == image of book*/}
        <div className="flex justify-center items-start">
          <div className="w-full max-w-sm aspect-square sticky top-24">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* middle-col == book info */}
        <div className="flex flex-col space-y-4 text-right mt-4">
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
            {book.title}
          </h1>

          <div className="text-gray-600 text-xs sm:text-sm flex items-center justify-start gap-2">
            {book.isAudiobook ? (
              <FileAudio size={16} />
            ) : (
              <BookOpenText size={16} />
            )}
            <span>{book.isAudiobook ? `کتاب صوتی` : `کتاب متنی`}</span>
          </div>

          {book.author && (
            <Link
              to={`/author/${book.author.id}`}
              className="text-sm text-gray-600 underline"
            >
              <span className="text-gray-600 text-xs sm:text-sm">نویسنده:</span>
              <span className="text-gray-900 text-xs sm:text-sm">
                {" "}
                {book.author.name}
              </span>
            </Link>
          )}
          {book.isAudiobook && book.narrator && (
            <h2 className="text-md text-gray-500 text-xs sm:text-sm">
              راوی: {book.narrator}
            </h2>
          )}
          <h2 className="text-md text-gray-500 text-xs sm:text-sm">
            ناشر: {book.publisher}
          </h2>

          <p className="text-gray-600 leading-relaxed pt-4 line-clamp-3 text-xs sm:text-sm md:text-md">
            {book.previewText}
          </p>
        </div>

        {/* third-col== price info*/}
        <div className="flex flex-col space-y-6 mt-4">
          <div className="bg-white p-6 rounded-lg shadow-md ">
            <p className="text-2xl font-bold text-gray-900 text-left my-2">
              {book.price.toLocaleString()}{" "}
              <span className="text-lg font-normal">تومان</span>
            </p>
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => addToCart(book)}
                className="w-full text-center bg-amber-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-amber-600 transition text-sm md:text-md"
              >
                افزودن به سبد خرید
              </button>
              {book.downloadLink && (
                <a
                  href={book.downloadLink}
                  download={`${book.title}-sample`}
                  className="w-full text-center bg-gray-100 text-gray-800 font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition text-sm md:text-md"
                >
                  دریافت نمونه
                </a>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button className="p-3 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-500 transition-colors text-sm md:text-md">
              <MessageCircleQuestion className="w-4 h-4" />
            </button>

            <button className="p-3 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-500 transition-colors text-sm md:text-md">
              <HeartIcon className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-semibold">
                ({book.rating.toFixed(1)})
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.round(book.rating)
                        ? "text-amber-400 fill-current  w-4 h-4"
                        : "text-gray-300 w-4 h-4"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tabs component */}
      <BookTabs
        comments={comments}
        book={book}
        onCommentSubmit={handleCommentSubmit}
      />
    </div>
  );
}

export default BookDetails;
