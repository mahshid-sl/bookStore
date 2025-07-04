import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PopularBookPage from "./pages/PopularBookPage";
import BookDetails from "./pages/BookDetails";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Cart from "./pages/Cart";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import RecommendedBooksPage from "./pages/RecommendedBooksPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./components/AppLayOut";

function App() {
  return (
    <BrowserRouter>
      <div dir="rtl" className="app bg-white font-vazirNormal ">
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="popularbook" element={<PopularBookPage />} />
            <Route path="newbook" element={<NewArrivalsPage />} />
            <Route path="details" element={<BookDetails />} />
            <Route path="recommended" element={<RecommendedBooksPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
