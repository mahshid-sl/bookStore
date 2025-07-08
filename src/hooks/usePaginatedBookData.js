import { useState, useEffect } from "react";

const BOOKS_PER_PAGE = 12;

function usePaginatedBookData(baseUrl) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allBooks, setAllBooks] = useState([]); // Store all books
  const [books, setBooks] = useState([]); // Store paginated books
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Effect 1: Reset when baseUrl changes
  useEffect(() => {
    setAllBooks([]);
    setBooks([]);
    setPage(1);
    setHasMore(true);
  }, [baseUrl]);

  // Effect 2: Fetch all books once
  useEffect(() => {
    if (!baseUrl) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAndCombineData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [booksRes, authorsRes] = await Promise.all([
          fetch(`${baseUrl}&t=${Date.now()}`, { signal, cache: "no-store" }),
          fetch("http://localhost:3001/author", { signal, cache: "no-store" }),
        ]);

        if (signal.aborted) return;
        if (!booksRes.ok || !authorsRes.ok)
          throw new Error("خطا در ارتباط با سرور");

        const booksData = await booksRes.json();
        const authorsData = await authorsRes.json();

        const authorsMap = new Map(
          authorsData.map((author) => [author.id, author])
        );

        const combinedBooks = booksData.map((book) => ({
          ...book,
          author: authorsMap.get(book.authorId) || null,
        }));

        setAllBooks(combinedBooks);

        setBooks(combinedBooks.slice(0, BOOKS_PER_PAGE)); // Load first page
        setHasMore(combinedBooks.length > BOOKS_PER_PAGE);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("خطا در بارگذاری داده‌ها");
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAndCombineData();

    return () => {
      controller.abort();
    };
  }, [baseUrl]);

  // Effect 3: Update displayed books when page changes
  useEffect(() => {
    if (page === 1) return; // Skip if already loaded first page
    const start = (page - 1) * BOOKS_PER_PAGE;
    const end = start + BOOKS_PER_PAGE;
    const newBooks = allBooks.slice(start, end);
    setBooks((prevBooks) => [...prevBooks, ...newBooks]);
    setHasMore(end < allBooks.length);
  }, [page, allBooks]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { books, loading, error, hasMore, loadMore };
}

export default usePaginatedBookData;
