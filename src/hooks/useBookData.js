import { useState, useEffect } from "react";

function useBookData(fetchUrl) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If the URL is null, it means we shouldn't fetch.
    // We clear any existing books and stop the loading state.
    if (!fetchUrl) {
      setBooks([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAndCombineData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [booksRes, authorsRes] = await Promise.all([
          fetch(fetchUrl, { signal }),
          fetch("http://localhost:3001/author", { signal }),
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

        setBooks(combinedBooks);
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
  }, [fetchUrl]);

  return { books, loading, error };
}

export default useBookData;
