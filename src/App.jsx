import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PopularBookPage from "./pages/PopularBookPage";
import { Book } from "lucide-react";
import BookDetails from "./pages/BookDetails";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <div dir="rtl" className="app bg-white font-vazirNormal ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="cart" element={<Cart />} />
          <Route path="popularbook" element={<PopularBookPage />} />
          <Route path="details" element={<BookDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
