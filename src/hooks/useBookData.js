import { useState, useEffect } from "react";

function useBookData(fetchUrl) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController to prevent memory leaks if the component unmounts while fetching
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAndCombineData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch books and all authors concurrently for better performance
        const [booksRes, authorsRes] = await Promise.all([
          fetch(fetchUrl, { signal }),
          fetch("http://localhost:3001/author", { signal }), // Fetches all authors
        ]);

        if (!booksRes.ok || !authorsRes.ok) {
          throw new Error("خطا در ارتباط با سرور");
        }

        const booksData = await booksRes.json();
        const authorsData = await authorsRes.json();

        // Create a Map of authors for efficient O(1) lookup
        const authorsMap = new Map(
          authorsData.map((author) => [author.id, author])
        );

        // Combine book data with its author using the map
        const combinedBooks = booksData.map((book) => ({
          ...book,
          author: authorsMap.get(book.authorId) || null, // Gracefully handle if author is not found
        }));

        setBooks(combinedBooks);
      } catch (err) {
        // Don't update state if the error is from aborting the fetch
        if (err.name !== "AbortError") {
          console.error(err.message);
          setError("خطا در بارگذاری داده‌ها");
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (fetchUrl) {
      fetchAndCombineData();
    } else {
      setLoading(false);
    }

    // Cleanup function: aborts the fetch request if the component unmounts
    return () => {
      controller.abort();
    };
  }, [fetchUrl]); // Re-run this effect whenever the fetchUrl changes

  return { books, loading, error };
}

export default useBookData;
