import { useRef } from "react";
import AuthorCarousel from "../components/AuthorCarousel";
import Hero from "../components/Hero";
import NewestBooks from "../components/NewestBooks";
import PopularBooks from "../components/PopularBooks";
import RecommendedBooks from "../components/RecommendedBooks";
import CtaBanner from "../components/CtaBanner";

function HomePage() {
  // creating ref
  const popularBooksRef = useRef(null);

  // scroll to popular books
  const handleScrollToPopular = () => {
    popularBooksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Hero onScrollToPopular={handleScrollToPopular} />
      <PopularBooks ref={popularBooksRef} />
      <AuthorCarousel />
      <NewestBooks />
      <RecommendedBooks />
      <CtaBanner />
    </div>
  );
}

export default HomePage;
