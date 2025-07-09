import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./components/AppLayOut";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";
import { ToastBar, Toaster } from "react-hot-toast";
import FaqPage from "./pages/FaqPage";

// Lazy load the following pages
const HomePage = lazy(() => import("./pages/HomePage"));
const PopularBookPage = lazy(() => import("./pages/PopularBookPage"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Cart = lazy(() => import("./pages/Cart"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Profile = lazy(() => import("./pages/Profile"));
const NewArrivalsPage = lazy(() => import("./pages/NewArrivalsPage"));
const RecommendedBooksPage = lazy(() => import("./pages/RecommendedBooksPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AuthorPage = lazy(() => import("./pages/AuthorPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AudiobooksPage = lazy(() => import("./pages/AudiobooksPage"));
const EbooksPage = lazy(() => import("./pages/EbooksPage"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster />
      <div dir="rtl" className="app bg-white font-vazirNormal ">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />

              {/* pages for audio/ebook  */}
              <Route path="/audiobooks" element={<AudiobooksPage />} />
              <Route path="/ebooks" element={<EbooksPage />} />
              {/* ========= */}

              {/* dynamic route for categories */}

              <Route
                path="/:bookType/:categorySlug"
                element={<CategoryPage />}
              />
              <Route
                path="/:bookType/:categorySlug/:subcategorySlug"
                element={<CategoryPage />}
              />

              <Route path="/books/:bookId/" element={<BookDetails />} />
              <Route path="/author/:authorId" element={<AuthorPage />} />

              {/* ========== */}

              {/* other pages=== */}
              <Route path="contact" element={<ContactUs />} />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="popularbook" element={<PopularBookPage />} />
              <Route path="newbook" element={<NewArrivalsPage />} />
              <Route path="recommended" element={<RecommendedBooksPage />} />
              <Route path="faq" element={<FaqPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
