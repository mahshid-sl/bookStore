import {
  ChevronLeft,
  CreditCard,
  Gift,
  Search,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";

function PurchaseGuidePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16 text-center">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
          راهنمای خرید و پرداخت
        </h1>
        <p className="mt-4 text-md sm:text-lg text-gray-600">
          یک تجربه خرید آسان و امن
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumbs */}
        <nav className="flex text-xs sm:text-sm text-gray-500 mb-12 items-center justify-start">
          <Link to="/" className="hover:text-amber-500">
            خانه
          </Link>
          <ChevronLeft size={20} className="mx-1" />
          <span className="font-semibold text-gray-700">راهنمای خرید</span>
        </nav>

        <div className="space-y-12">
          {/* Step-by-step Guide */}
          <div className="space-y-8">
            {/* Step 1: Find & Add to Cart */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-600">
                  <Search size={32} />
                </div>
                <div className="h-16 w-0.5 bg-gray-200 my-2"></div>
              </div>
              <div className="text-right mt-1">
                <h3 className="text-md sm:text-lg font-bold text-gray-800">
                  مرحله اول: انتخاب کتاب
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed text-sm sm:text-md">
                  در میان هزاران کتاب الکترونیک و صوتی در فروشگاه ما جستجو کنید.
                  پس از پیدا کردن کتاب مورد نظر، روی دکمه «افزودن به سبد خرید»
                  کلیک کنید.
                </p>
              </div>
            </div>

            {/* Step 2: View Cart & Discount */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-600">
                  <ShoppingCart size={32} />
                </div>
                <div className="h-16 w-0.5 bg-gray-200 my-2"></div>
              </div>
              <div className="text-right mt-1">
                <h3 className="text-md sm:text-lg font-bold text-gray-800">
                  مرحله دوم: سبد خرید
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed text-sm sm:text-md">
                  پس از اضافه کردن تمام کتاب‌های مورد نظر، روی آیکون سبد خرید در
                  بالای صفحه کلیک کنید. در این صفحه می‌توانید لیست کتاب‌های خود
                  را مرور کرده و در صورت داشتن کد تخفیف، آن را در کادر مربوطه
                  وارد کنید.
                </p>
              </div>
            </div>

            {/* Step 3: Checkout & Payment */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-600">
                  <CreditCard size={32} />
                </div>
              </div>
              <div className="text-right mt-1">
                <h3 className="text-md sm:text-lg font-bold text-gray-800">
                  مرحله سوم: پرداخت نهایی
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed text-sm sm:text-md">
                  با کلیک روی دکمه «تکمیل خرید»، به صفحه پرداخت هدایت می‌شوید.
                  در این مرحله، اطلاعات خود را وارد کرده و سپس به درگاه پرداخت
                  امن بانکی متصل خواهید شد.
                </p>
              </div>
            </div>
          </div>

          {/* Secure Payment Section */}
          <div className="p-8 bg-green-50 rounded-lg text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShieldCheck size={32} className="text-green-600" />
              <h2 className="text-lg sm:text-xl   font-bold text-green-800">
                پرداخت امن و مطمئن
              </h2>
            </div>
            <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-md">
              تمام تراکنش‌های شما از طریق درگاه‌های پرداخت رسمی و با استفاده از
              پروتکل‌های امنیتی پیشرفته (SSL) انجام می‌شود. ما به حریم خصوصی و
              امنیت اطلاعات شما متعهد هستیم.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseGuidePage;
