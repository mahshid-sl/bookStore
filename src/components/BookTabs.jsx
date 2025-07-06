import { useState } from "react";

function BookTabs({ book }) {
  const [activeTab, setActiveTab] = useState("description");

  // استایل‌های مشترک برای هر تب
  const tabStyles =
    "px-6 py-3 font-semibold rounded-t-lg transition-colors focus:outline-none";
  // استایل تبی که فعال است
  const activeTabStyles = "bg-white text-gray-800 border-b-2 border-amber-500";
  // استایل تبی که غیرفعال است
  const inactiveTabStyles = "bg-transparent text-gray-500 hover:bg-gray-100";

  return (
    <div className="w-full mt-16">
      {/* نوار تب‌ها */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-1 sm:space-x-4" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("description")}
            className={`${tabStyles} ${
              activeTab === "description" ? activeTabStyles : inactiveTabStyles
            }`}
          >
            معرفی
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`${tabStyles} ${
              activeTab === "specs" ? activeTabStyles : inactiveTabStyles
            }`}
          >
            مشخصات
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`${tabStyles} ${
              activeTab === "reviews" ? activeTabStyles : inactiveTabStyles
            }`}
          >
            نقد و نظرها
          </button>
        </nav>
      </div>

      {/* محتوای تب‌ها */}
      <div className="py-8 px-4 sm:px-6 bg-white rounded-b-lg shadow">
        {/* محتوای تب "معرفی" */}
        {activeTab === "description" && (
          <div className="prose max-w-none text-gray-600 leading-loose text-right">
            {/* استفاده از توضیحات کامل در صورت وجود */}
            <p>{book.description || book.previewText}</p>
          </div>
        )}

        {/* محتوای تب "مشخصات" */}
        {activeTab === "specs" && (
          <ul className="space-y-4 text-gray-700 text-sm px-5">
            {/* --- اصلاح شده: استفاده از justify-between برای چیدمان بهتر --- */}
            <li className="flex justify-between border-b border-gray-200 pb-3">
              <span>فرمت محتوا</span>
              <span className="font-semibold">
                {book.isAudiobook ? "mp3" : "PDF"}
              </span>
            </li>

            {/* --- اصلاح شده: رندر شرطی برای اطلاعات کتاب صوتی --- */}
            {book.isAudiobook && book.duration && (
              <li className="flex justify-between border-b border-gray-200 pb-3">
                <span>مدت زمان</span>
                <span className="font-semibold">{book.duration}</span>
              </li>
            )}

            <li className="flex justify-between border-b border-gray-200 pb-3">
              <span>نویسنده</span>
              <span className="font-semibold">
                {book.author?.name || "---"}
              </span>
            </li>

            {book.isAudiobook && book.narrator && (
              <li className="flex justify-between border-b border-gray-200 pb-3">
                <span>راوی</span>
                <span className="font-semibold">{book.narrator}</span>
              </li>
            )}

            <li className="flex justify-between border-b border-gray-200 pb-3">
              <span>ناشر</span>
              <span className="font-semibold">{book.publisher}</span>
            </li>
            <li className="flex justify-between border-b border-gray-200 pb-3">
              <span>سال انتشار</span>
              <span className="font-semibold">{book.publicationYear}</span>
            </li>
            <li className="flex justify-between pb-3">
              <span>زبان</span>
              <span className="font-semibold">{book.language || "فارسی"}</span>
            </li>
          </ul>
        )}

        {/* محتوای تب "نقد و نظرها" */}
        {activeTab === "reviews" && (
          <div className="text-center text-gray-500 py-10">
            <p>هنوز نظری برای این کتاب ثبت نشده است.</p>
            <p className="text-xs mt-2">شما اولین نفر باشید!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookTabs;
