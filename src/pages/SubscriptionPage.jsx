import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ChevronLeft, Star } from "lucide-react";

// داده‌های نمونه برای طرح‌های اشتراک
const subscriptionPlans = [
  {
    name: "اشتراک ماهانه",
    price: "49,000",
    billingCycle: "ماهانه",
    features: [
      "دسترسی نامحدود به هزاران کتاب",
      "امکان دانلود ۵ کتاب در ماه",
      "دسترسی به کتاب‌های صوتی ویژه",
      "پشتیبانی ایمیلی",
    ],
    isPopular: false,
  },
  {
    name: "اشتراک سالانه",
    price: "490,000",
    billingCycle: "سالانه",
    features: [
      "تمام ویژگی‌های طرح ماهانه",
      "۲۰٪ تخفیف در مقایسه با پرداخت ماهانه",
      "دسترسی زودهنگام به کتاب‌های جدید",
      "امکان دانلود نامحدود",
    ],
    isPopular: true,
  },
];

function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("اشتراک سالانه");

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="text-center py-16 sm:py-24 bg-white">
        <h1 className="text-md sm:text-lg md:text-xl font-extrabold text-gray-900">
          عضویت ویژه بوک استور
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-md lg:text-lg  text-gray-600 px-2">
          با خرید اشتراک، به دنیایی از کتاب‌های الکترونیک و صوتی دسترسی نامحدود
          داشته باشید.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumbs */}
        <nav className="flex text-xs sm:text-sm text-gray-500 mb-12 items-center justify-start">
          <Link to="/" className="hover:text-amber-500">
            خانه
          </Link>
          <ChevronLeft size={20} className="mx-1" />
          <span className="font-semibold text-gray-700">خرید اشتراک</span>
        </nav>

        {/* Pricing Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative border rounded-2xl p-8 text-center transition-all duration-300 ${
                selectedPlan === plan.name
                  ? "border-amber-500 border-2 shadow-2xl scale-105"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-1.5 text-xs font-semibold text-white">
                    <Star size={14} fill="white" />
                    محبوب‌ترین
                  </span>
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                {plan.name}
              </h3>
              <p className="mt-4 text-lg sm:text-xl font-extrabold text-gray-900">
                {plan.price}
                <span className="text-sm sm:text-md font-medium text-gray-500">
                  {" "}
                  تومان
                </span>
              </p>
              <p className="mt-1 text-sm sm:text-md text-gray-500">
                پرداخت به صورت {plan.billingCycle}
              </p>

              <ul className="mt-8 space-y-4 text-right text-sm sm:text-md">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan.name)}
                className={`mt-10 w-full py-3 px-6 font-bold 
                  text-sm sm:text-md
                  rounded-lg transition-colors ${
                    selectedPlan === plan.name
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {selectedPlan === plan.name ? "انتخاب شده" : "انتخاب طرح"}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section for Subscriptions */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h2 className="text-md sm:text-xl md:text-2xl font-bold text-gray-800">
            سوالات متداول اشتراک
          </h2>
          <div className="mt-6 space-y-4 text-right ">
            <details className="p-4 bg-white rounded-lg shadow-sm cursor-pointer">
              <summary className="font-semibold text-sm sm:text-md md:text-lg">
                آیا می‌توانم اشتراک خود را لغو کنم؟
              </summary>
              <p className="mt-2 text-gray-600 leading-relaxed text-sm sm:text-md">
                بله، شما هر زمان که بخواهید می‌توانید از طریق پنل کاربری خود،
                تمدید خودکار اشتراک را لغو کنید و تا پایان دوره فعلی از خدمات
                استفاده نمایید.
              </p>
            </details>
            <details className="p-4 bg-white rounded-lg shadow-sm cursor-pointer">
              <summary className="font-semibold text-sm sm:text-md md:text-lg">
                پرداخت به چه صورت است؟
              </summary>
              <p className="mt-2 text-gray-600 leading-relaxed text-sm sm:text-md">
                پرداخت هزینه اشتراک از طریق تمام کارت‌های عضو شتاب و درگاه
                پرداخت امن بانکی امکان‌پذیر است.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPage;
