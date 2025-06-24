import { useEffect, useState } from "react";
import { heroBooks } from "../data/heroBooks";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HeroSlider() {
  const [slideIndex, setSlideIndex] = useState(0);

  //change slider at every 5sec
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSlideIndex((prev) => (prev + 1) % heroBooks.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // prev-slide
  function handlePrev() {
    setSlideIndex((prev) => (prev === 0 ? heroBooks.length - 1 : prev - 1));
  }

  //next-slide
  function handleNext() {
    setSlideIndex((prev) => (prev + 1) % heroBooks.length);
  }

  const currentBook = heroBooks[slideIndex];

  return (
    <div className="relative w-full flex items-center justify-center min-h-[500px] overflow-hidden">
      <div className="absolute top-10 text-center max-w-sm mx-auto z-20 transition-opacity duration-700 ease-in-out opacity-100">
        <h3 className="font-semibold text-gray-800">{currentBook.title}</h3>
        <p className="text-sm text-gray-500">{`نوشته: ${currentBook.author}`}</p>
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <div className="w-[480px] h-[520px] rounded-lg overflow-hidden transition-opacity duration-700 ease-in-out opacity-100">
          <img
            src={currentBook.img}
            alt={currentBook.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* دکمه قبلی */}
      <button
        onClick={handlePrev}
        aria-label="کتاب قبلی"
        className="absolute right-3 top-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[#fb9e22] text-[#33333] shadow-md hover:scale-110 transition-transform z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* دکمه بعدی */}
      <button
        onClick={handleNext}
        aria-label="کتاب بعدی"
        className="absolute left-3 top-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[#fb9e22] text-[#33333] shadow-md hover:scale-110 transition-transform z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
    </div>
  );
}

export default HeroSlider;
