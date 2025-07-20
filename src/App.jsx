import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./components/AppLayOut";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CartProvider from "./contexts/CartContext";

// Lazy load the following pages
const HomePage = lazy(() => import("./pages/HomePage"));
const PopularBookPage = lazy(() => import("./pages/PopularBookPage"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Cart = lazy(() => import("./pages/Cart"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NewArrivalsPage = lazy(() => import("./pages/NewArrivalsPage"));
const RecommendedBooksPage = lazy(() => import("./pages/RecommendedBooksPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AuthorPage = lazy(() => import("./pages/AuthorPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AudiobooksPage = lazy(() => import("./pages/AudiobooksPage"));
const EbooksPage = lazy(() => import("./pages/EbooksPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const DownloadGuidePage = lazy(() => import("./pages/DownloadGuidePage"));
const SubscriptionPage = lazy(() => import("./pages/SubscriptionPage"));
const PurchaseGuidePage = lazy(() => import("./pages/PurchaseGuidePage"));

function App() {
  return (
    <AuthProvider>
      <CartProvider>
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
                  <Route
                    path="cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route
                    path="profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="popularbook" element={<PopularBookPage />} />
                  <Route path="newbook" element={<NewArrivalsPage />} />
                  <Route
                    path="recommended"
                    element={<RecommendedBooksPage />}
                  />
                  <Route path="faq" element={<FaqPage />} />
                  <Route path="shipping-info" element={<DownloadGuidePage />} />
                  <Route path="how-to-order" element={<PurchaseGuidePage />} />
                  <Route path="subscribe" element={<SubscriptionPage />} />

                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
