import {
  LibraryBig,
  PhoneCall,
  Rocket,
  Mail,
  Youtube,
  Instagram,
  Send,
  ArrowUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Check scroll position on mount
    const toggleVisibility = () => {
      // if user scrolled more than 300px, show the button
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <footer className="bg-black text-white relative mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 text-center bg-white rounded-b-md shadow-lg text-black">
          {/* Card 1 */}
          <div className="flex flex-col items-center space-y-3 p-6">
            <LibraryBig size={40} className="text-amber-500" />
            <h3 className="text-lg font-semibold">نمونه رایگان</h3>
            <p className="text-sm text-gray-600">
              فصل اول کتاب‌ها یا چند دقیقه از نسخه صوتی را رایگان بررسی کنید.
            </p>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center space-y-3 p-6 md:border-x-2 md:border-amber-300">
            <Rocket size={40} className="text-amber-500" />
            <h3 className="text-lg font-semibold">دانلود آنی</h3>
            <p className="text-sm text-gray-600">
              پس از پرداخت، بلافاصله به فایل کتاب‌های خود دسترسی پیدا کنید.
            </p>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center space-y-3 p-6">
            <PhoneCall size={40} className="text-amber-500" />
            <h3 className="text-lg font-semibold">پشتیبانی ۲۴ ساعته</h3>
            <p className="text-sm text-gray-600">
              کارشناسان ما ۷ روز هفته، آماده پاسخ‌گویی به سوالات شما هستند.
            </p>
          </div>
        </div>
      </div>

      {/* ===== بخش میانی: لینک‌ها و اطلاعات ===== */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 grid grid-cols-1 md:grid-cols-2 
      lg:grid-cols-4 gap-8 text-right"
      >
        {/* ستون اول: لینک‌های اصلی */}
        <div className="space-y-4">
          <h4 className="font-bold text-lg">دسترسی سریع</h4>
          <nav className="flex flex-col space-y-3 text-gray-400">
            <Link to="/aboutus" className="hover:text-amber-400">
              درباره ما
            </Link>
            <Link to="/contact" className="hover:text-amber-400">
              تماس با ما
            </Link>
            <Link to="/faq" className="hover:text-amber-400">
              سوالات متداول
            </Link>
          </nav>
        </div>

        {/* ستون دوم: راهنمای مشتریان */}
        <div className="space-y-4">
          <h4 className="font-bold text-lg">پشتیبانی و راهنما</h4>
          <nav className="flex flex-col space-y-3 text-gray-400">
            <Link to="/shipping-info" className="hover:text-amber-400">
              راهنمای نحوه دانلود و استفاده از فایل‌ها
            </Link>
            <Link to="/how-to-order" className="hover:text-amber-400">
              راهنمای خرید و پرداخت
            </Link>
          </nav>
        </div>

        {/* ستون سوم: تماس با ما */}
        <div className="space-y-4  ">
          <h4 className="font-bold text-lg">تماس با ما</h4>
          <div className="flex flex-col space-y-3 text-gray-400">
            <a
              href="tel:0213213211"
              className="flex items-center gap-2 hover:text-amber-400"
            >
              <PhoneCall size={16} /> <span>021-3213211</span>
            </a>
            <a
              href="mailto:BookStore@info"
              className="flex items-center gap-2 hover:text-amber-400"
            >
              <Mail size={16} /> <span>BookStore@info</span>
            </a>
          </div>
          {/* شبکه‌های اجتماعی */}
          <div className="flex items-center gap-4 pt-2">
            <Link to="#" className="text-gray-400 hover:text-amber-400">
              <Instagram />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-amber-400">
              <Send />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-amber-400">
              <Youtube />
            </Link>
          </div>
        </div>

        {/* ستون چهارم: لوگو و نمادها */}
        <div className="flex md:flex-col justify-center items-center  space-y-4 ">
          {/* لوگوی اصلی */}
          <Link
            to="/"
            className="bg-[#fb9e22] px-3 py-5 rounded-md text-sm font-bold leading-tight text-center font-sans flex flex-col"
          >
            <span className="text-black">BOOK</span>
            <span className="font-medium text-gray-800">STORE</span>
          </Link>
          {/* نماد ساماندهی */}
          <img
            className="w-36 h-36  object-contain"
            src="/images/samandehi.png"
            alt="نماد ساماندهی"
          />
        </div>
      </div>

      {/* ===== بخش پایینی: کپی رایت ===== */}
      <div className="bg-white text-center py-4">
        <p className="text-sm text-black">
          کلیه حقوق مادی و معنوی سایت نزد فروشگاه آنلاین بوک استور محفوظ است.
        </p>
      </div>
      {/* back to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition-transform hover:scale-110 focus:outline-none z-50"
          aria-label="برو به بالا"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </footer>
  );
}

export default Footer;
