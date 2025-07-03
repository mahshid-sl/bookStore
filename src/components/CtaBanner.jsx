import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function CtaBanner() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ===== نسخه دسکتاپ و تبلت (از md به بالا نمایش داده می‌شود) ===== */}
      <div className="hidden md:relative md:aspect-[2/1] lg:aspect-[3/1] md:flex md:items-center">
        {/* عکس قفسه کتاب (فقط در دسکتاپ نمایش داده می‌شود) */}
        <div className="hidden lg:block absolute top-4 left-10 w-32 z-20">
          <img
            src="/images/newbook2.png"
            alt="قفسه کتاب"
            className="w-full h-auto"
          />
        </div>

        {/* بنر تبلیغاتی */}
        {/* در تبلت تمام عرض (w-full) و در دسکتاپ سه چهارم عرض (lg:w-3/4) است */}
        <div className="w-full h-full absolute right-0 top-0 isolate rounded-lg overflow-hidden lg:w-3/4">
          {/* پس‌زمینه و روکش */}
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/newbook_bg.png')" }}
          >
            <div className="absolute inset-0 bg-gray-100/80"></div>
          </div>
          {/* محتوای متنی بنر */}
          {/* پدینگ در حالت تبلت و دسکتاپ متفاوت است */}
          <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-8 lg:items-start lg:text-right lg:pr-[calc(30%)] lg:pl-8">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              تــا ۵۰٪ تـخفـیـفـــــ!
            </h3>
            <p className="font-medium text-gray-800 mt-1">
              همراه با دریافت نسخه صوتی کتاب
            </p>
            <p className="mt-4 text-lg flex gap-1.5 text-white bg-[#131313] p-2 rounded-md">
              فقط با خرید <span className="text-amber-500">اشتراکـــ</span> از
              ما
            </p>
            <Link
              to="/subscribe"
              className="flex justify-center items-center mt-6 bg-[#fb9e22] px-7 py-2.5 rounded-md font-semibold hover:bg-orange-500 transition-colors text-black gap-1"
            >
              <Sparkles fill="black" size={20} />
              خرید اشتراک
            </Link>
          </div>
        </div>

        {/* تصویر محصول اصلی (فقط در دسکتاپ نمایش داده می‌شود) */}
        <div className="hidden lg:block absolute left-[5%] top-1/2 -translate-y-1/2 w-1/2 lg:w-[45%] z-10">
          <img
            src="/images/newbook3.png"
            alt="محصول ویژه"
            className="w-full h-auto object-contain drop-shadow-2xl transform -rotate-12"
          />
        </div>
      </div>

      {/* ===== نسخه موبایل (فقط در صفحات کوچک نمایش داده می‌شود) ===== */}
      <div className="md:hidden relative isolate rounded-lg overflow-hidden py-16 px-4 text-center">
        {/* پس‌زمینه و روکش */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/newbook_bg.png')" }}
        >
          <div className="absolute inset-0 bg-gray-100/80"></div>
        </div>

        {/* محتوای متنی */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <h3 className="text-3xl font-extrabold text-gray-800">
            تــا ۵۰٪ تـخفـیـفـــــ!
          </h3>
          <p className="font-medium text-gray-800">
            همراه با دریافت نسخه صوتی کتاب
          </p>
          <p className="text-lg flex gap-1.5 text-white bg-[#131313] p-2 rounded-md">
            فقط با خرید <span className="text-amber-500">اشتراکـــ</span> از ما
          </p>
          <Link
            to="/subscribe"
            className="flex justify-center items-center mt-4 bg-[#fb9e22] px-10 py-3 rounded-md font-semibold text-black gap-1.5"
          >
            <Sparkles fill="black" size={20} />
            خرید اشتراک
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CtaBanner;
