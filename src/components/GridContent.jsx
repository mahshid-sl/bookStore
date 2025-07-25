import usePaginatedBookData from "../hooks/usePaginatedBookData";
import BookCard from "./BookCard";
import Error from "./Error";
import Loading from "./Loading";

function GridContent({ baseUrl }) {
  const { books, loading, error, hasMore, loadMore } =
    usePaginatedBookData(baseUrl);

  // Show a full-page loading indicator only on the initial load
  if (loading && books.length === 0) return <Loading />;
  if (error) return <Error>{error}</Error>;

  return (
    <>
      <div className="grid 2xl:grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className="text-center mt-12">
        {hasMore && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-amber-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-wait"
          >
            {loading ? "در حال بارگذاری..." : "نمایش بیشتر"}
          </button>
        )}
        {!hasMore && books.length > 0 && (
          <p className="text-gray-500">تمام کتاب‌ها نمایش داده شدند.</p>
        )}
      </div>
    </>
  );
}

export default GridContent;
