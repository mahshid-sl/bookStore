import { Link } from "react-router-dom";
import { ServerCrash, Home } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white text-center px-4">
      <div className="max-w-md">
        <ServerCrash
          className="mx-auto h-24 w-24 text-amber-500"
          strokeWidth={1}
        />
        <h1 className="mt-8 text-6xl font-extrabold text-gray-900 tracking-tight sm:text-8xl">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          صفحه مورد نظر یافت نشد
        </h2>
        <p className="mt-4 text-gray-600">
          متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد. ممکن است آدرس را
          اشتباه وارد کرده باشید یا صفحه حذف شده باشد.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-amber-600"
        >
          <Home size={20} />
          <span>بازگشت به صفحه اصلی</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
