import { useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "چگونه فایل کتاب را پس از خرید دانلود کنم؟",
    answer:
      "پس از تکمیل پرداخت، به صفحه حساب کاربری خود و بخش «دانلودها» مراجعه کنید. تمام کتاب‌های خریداری شده در آنجا برای دانلود فوری در دسترس هستند.",
  },
  {
    question: "کتاب‌ها با چه فرمتی ارائه می‌شوند؟",
    answer:
      "کتاب‌های الکترونیک معمولاً با فرمت PDF و EPUB و کتاب‌های صوتی با فرمت MP3 ارائه می‌شوند. این فرمت‌ها با اکثر دستگاه‌ها و نرم‌افزارهای کتابخوان سازگار هستند.",
  },
  {
    question: "آیا می‌توانم کتاب‌ها را روی چند دستگاه استفاده کنم؟",
    answer:
      "بله، پس از خرید و دانلود، شما می‌توانید فایل کتاب را روی تمام دستگاه‌های شخصی خود (موبایل، تبلت، کامپیوتر) استفاده کنید.",
  },
  {
    question: "اگر در پرداخت یا دانلود با مشکل مواجه شدم چه کار کنم؟",
    answer:
      "در صورت بروز هرگونه مشکل، لطفاً بلافاصله از طریق صفحه «تماس با ما» یا شماره تلفن پشتیبانی با ما در ارتباط باشید. تیم ما در اسرع وقت مشکل شما را برطرف خواهد کرد.",
  },
  {
    question: "آیا امکان بازگشت وجه برای کتاب‌های دیجیتال وجود دارد؟",
    answer:
      "به دلیل ماهیت دیجیتال محصولات، متاسفانه امکان بازگشت وجه پس از تکمیل خرید و دانلود فایل وجود ندارد. به همین دلیل، پیشنهاد می‌کنیم قبل از خرید، حتماً نمونه رایگان کتاب را بررسی کنید.",
  },
];

// faq item component
function FaqItem({ faq, index, openIndex, setOpenIndex }) {
  const isOpen = index === openIndex;

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="flex w-full items-center justify-between text-right"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-800">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pt-4"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">سوالات متداول</h1>
        <p className="mt-4 text-lg text-gray-600">پاسخ به پرسش‌های شما</p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-12 items-center justify-start">
          <Link to="/" className="hover:text-amber-500">
            خانه
          </Link>
          <ChevronLeft size={20} className="mx-1" />
          <span className="font-semibold text-gray-700">سوالات متداول</span>
        </nav>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FaqPage;
