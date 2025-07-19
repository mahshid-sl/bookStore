import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SearchBar from "./SearchBar";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
