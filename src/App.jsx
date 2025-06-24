import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PopularBookPage from "./pages/PopularBookPage";

function App() {
  return (
    <BrowserRouter>
      <div dir="rtl" className="app bg-white font-vazirNormal ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="popularbook" element={<PopularBookPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
