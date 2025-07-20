import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import useBookData from "../hooks/useBookData";
import BookSearchItem from "./BookSearchItem";
import AuthorSearchItem from "./AuthorSearchItem";
import { useSearchParams } from "react-router-dom";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchItem, setSearchItem] = useState(searchParams.get("q") || "");

  // get books
  const { books } = useBookData("http://localhost:3001/books");

  // get authors
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await fetch("http://localhost:3001/author");
      const data = await response.json();
      setAuthors(data);
    };
    fetchAuthors();
  }, []);

  // update URL with search params
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchItem) {
        setSearchParams({ q: searchItem });
      } else {
        searchParams.delete("q");
        setSearchParams(searchParams);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchItem, setSearchParams, searchParams]);

  // filtered results
  const filteredResults = useMemo(() => {
    if (!searchItem.trim()) return [];
    // filtered authors
    const filteredAuthors = authors
      .filter((author) => author.name.includes(searchItem))
      .map((author) => ({ ...author, type: "author" }));
    // ======================
    // filtered books
    const filteredBooks = books
      .filter((book) => {
        const titleMatch = book.title.includes(searchItem);
        const authorMatch = book.author?.name.includes(searchItem);
        return titleMatch || authorMatch;
      })
      .map((book) => ({ ...book, type: "book" }));

    // combined results
    return [...filteredBooks, ...filteredAuthors];
  }, [books, authors, searchItem]);

  const clearSearch = () => {
    setSearchItem("");
  };

  return (
    <>
      {searchItem && (
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-sm z-20"
          onClick={clearSearch}
          aria-hidden="true"
        />
      )}

      <section className=" py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto relative z-30">
            <div className="relative">
              <input
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                type="text"
                placeholder="نام کتاب،نویسنده و ..."
                className="w-full pr-12 pl-4 py-3 text-right 
              bg-[#f2f2f2] text-gray-600 placeholder:text-gray-400
            rounded-lg  focus:ring-orange-500 focus:border-transparent
            focus:outline-2 focus:-outline-offset-2 focus:outline-orange-300
            "
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#fb9e22] h-5 w-5" />
            </div>

            {searchItem && (
              <div
                className="searchbox p-3 mt-1  text-right  transition-all duration-300 ease-in-out
              bg-[#f2f2f2]
            rounded-b-lg max-h-60 overflow-y-auto shadow-lg"
              >
                {filteredResults.length === 0 ? (
                  <p className="text-sm text-center text-gray-500">
                    نتیجه‌ای یافت نشد
                  </p>
                ) : (
                  <ul className=" text-gray-600 ">
                    {filteredResults.map((item) => {
                      if (item.type === "book") {
                        return <BookSearchItem book={item} key={item.id} />;
                      }
                      return <AuthorSearchItem author={item} key={item.id} />;
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default SearchBar;
