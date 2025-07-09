import { ChevronLeft, Book, Target, Heart } from "lucide-react";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800 py-24 sm:py-32">
        <img
          src="./images/aboutus-hero.webp"
          alt="کتابخانه"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          onError={(e) =>
            (e.target.src =
              "https://placehold.co/1920x1080/333/FFF?text=Library")
          }
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            درباره بوک استور
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
            سفری در دنیای کلمات و داستان‌ها، جایی که هر کتاب دریچه‌ای نو به سوی
            دانایی است.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-gray-500 mb-12 items-center justify-start">
            <Link to="/" className="hover:text-amber-500">
              خانه
            </Link>
            <ChevronLeft size={20} className="mx-1" />
            <span className="font-semibold text-gray-700">درباره ما</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Right Column: Our Story */}
            <div className="text-right">
              <h2 className="text-3xl font-extrabold text-gray-900 border-r-4 border-amber-500 pr-4 mb-6">
                داستان ما
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  بوک استور با یک رویای ساده آغاز شد: ایجاد فضایی برای عاشقان
                  کتاب تا بتوانند به راحتی به گنجینه‌ای از بهترین کتاب‌های
                  الکترونیک و صوتی دسترسی داشته باشند. ما باور داریم که کتاب‌ها،
                  فارغ از فرمتشان، قدرت تغییر زندگی، گسترش دیدگاه و ایجاد
                  ارتباطی عمیق با دنیای اطراف را دارند.
                </p>
                <p>
                  تیم ما متشکل از گروهی از کتاب‌خوانان حرفه‌ای و متخصصان فناوری
                  است که با وسواس، بهترین آثار را از سراسر جهان انتخاب کرده و با
                  بالاترین کیفیت در اختیار شما قرار می‌دهند. هدف ما این است که
                  تجربه خرید و مطالعه کتاب دیجیتال را به تجربه‌ای لذت‌بخش و
                  بی‌دردسر تبدیل کنیم.
                </p>
              </div>
            </div>

            {/* Left Column: Our Values */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-right">
                ارزش‌های ما
              </h3>
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-500 text-white">
                      <Target size={24} />
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="text-lg font-semibold text-gray-900">
                      ماموریت ما
                    </h4>
                    <p className="mt-1 text-gray-600">
                      تسهیل دسترسی به دانش و سرگرمی از طریق ارائه کتاب‌های
                      دیجیتال با کیفیت و قیمت مناسب برای همه.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-500 text-white">
                      <Book size={24} />
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="text-lg font-semibold text-gray-900">
                      عشق به کتاب
                    </h4>
                    <p className="mt-1 text-gray-600">
                      ما مجموعه‌ای را انتخاب می‌کنیم که خودمان به خواندن آن
                      افتخار می‌کنیم. هر کتاب با دقت و وسواس انتخاب می‌شود.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-500 text-white">
                      <Heart size={24} />
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="text-lg font-semibold text-gray-900">
                      رضایت شما
                    </h4>
                    <p className="mt-1 text-gray-600">
                      تجربه شما برای ما در اولویت قرار دارد. از لحظه ورود به
                      سایت تا دانلود کتاب، ما در کنار شما هستیم.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
