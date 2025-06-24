import Header from "../components/Header";
import Hero from "../components/Hero";
import PopularBooks from "../components/PopularBooks";
import SearchBar from "../components/SearchBar";
import OfflineSwiper from "../components/Swiper";

function HomePage() {
  return (
    <div>
      <Header />
      <SearchBar />
      <Hero />
      <PopularBooks />
    </div>
  );
}

export default HomePage;
