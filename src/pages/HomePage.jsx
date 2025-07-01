import AuthorCarousel from "../components/AuthorCarousel";
import Header from "../components/Header";
import Hero from "../components/Hero";
import NewestBooks from "../components/NewestBooks";
import PopularBooks from "../components/PopularBooks";
import SearchBar from "../components/SearchBar";
import NewArrivalsPage from "./NewArrivalsPage";
function HomePage() {
  return (
    <div>
      <Header />
      <SearchBar />
      <Hero />
      <PopularBooks />
      <AuthorCarousel />
      <NewestBooks />
    </div>
  );
}

export default HomePage;
