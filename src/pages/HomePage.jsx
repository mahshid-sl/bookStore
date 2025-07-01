import { useRef } from "react";
import AuthorCarousel from "../components/AuthorCarousel";
import Header from "../components/Header";
import Hero from "../components/Hero";
import NewestBooks from "../components/NewestBooks";
import PopularBooks from "../components/PopularBooks";
import SearchBar from "../components/SearchBar";

function HomePage() {
  // creating ref
  const popularBooksRef = useRef(null);

  // scroll to popular books
  const handleScrollToPopular = () => {
    popularBooksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Header />
      <SearchBar />
      <Hero onScrollToPopular={handleScrollToPopular} />
      <PopularBooks ref={popularBooksRef} />
      <AuthorCarousel />
      <NewestBooks />
    </div>
  );
}

export default HomePage;
