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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

// import { useEffect, useRef } from "react";
// import usePaginatedBookData from "../hooks/usePaginatedBookData";
// import BookCard from "./BookCard";
// import Error from "./Error";
// import Loading from "./Loading";

// // این مقدار باید با مقدار داخل هوک شما یکسان باشد
// const BOOKS_PER_PAGE = 12;

// function GridContent({ baseUrl }) {
//   const { books, loading, error, hasMore, loadMore } =
//     usePaginatedBookData(baseUrl);

//   // 1. یک ref برای نگه داشتن ارجاع به دکمه "نمایش بیشتر"
//   const loadMoreRef = useRef(null);

//   // 2. این افکت با هر بار تغییر در لیست کتاب‌ها اجرا می‌شود
//   useEffect(() => {
//     // ما فقط زمانی اسکرول می‌کنیم که کتاب‌های جدید اضافه شده باشند (نه در بارگذاری اولیه)
//     // یک راه ساده برای این کار، چک کردن طول آرایه کتاب‌هاست
//     if (books.length > BOOKS_PER_PAGE) {
//       loadMoreRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }, [books]); // این افکت به آرایه books وابسته است

//   if (loading && books.length === 0) return <Loading />;
//   if (error) return <Error>{error}</Error>;

//   return (
//     <>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {books.map((book) => (
//           <BookCard key={book.id} book={book} />
//         ))}
//       </div>

//       {/* 3. ref را به کانتینر دکمه متصل می‌کنیم */}
//       <div ref={loadMoreRef} className="text-center mt-12 h-12"> {/* A little height to help scrolling */}
//         {hasMore && (
//           <button
//             onClick={loadMore}
//             disabled={loading}
//             className="bg-amber-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-wait"
//           >
//             {loading ? "در حال بارگذاری..." : "نمایش بیشتر"}
//           </button>
//         )}
//         {!hasMore && books.length > 0 && (
//           <p className="text-gray-500">تمام کتاب‌ها نمایش داده شدند.</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default GridContent;
