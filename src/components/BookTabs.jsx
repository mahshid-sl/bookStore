import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";

function BookTabs({ book, comments, onCommentSubmit }) {
  const [activeTab, setActiveTab] = useState("description");
  const { isAuthenticated } = useAuth();

  // tab styles=====
  const tabStyles =
    "px-6 py-3 font-semibold rounded-t-lg transition-colors focus:outline-none";

  const activeTabStyles = "bg-white text-gray-800 border-b-2 border-amber-500";

  const inactiveTabStyles = "bg-transparent text-gray-500 hover:bg-gray-100";

  return (
    <div className="w-full mt-16">
      {/* tabs */}
      <div className="border-b border-gray-200">
        <nav
          className="-mb-px flex space-x-1 sm:space-x-4 text-sm sm:text-md"
          aria-label="Tabs"
        >
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

      {/* tabs content */}
      <div className="py-8 px-4 sm:px-6 bg-white rounded-b-lg shadow text-sm md:text-md">
        {/* description */}
        {activeTab === "description" && (
          <div className="prose max-w-none text-gray-600 leading-loose text-right">
            <p>{book.description || book.previewText}</p>
          </div>
        )}

        {/* specs */}
        {activeTab === "specs" && (
          <ul className="space-y-4 text-gray-700 text-sm px-5">
            <li className="flex justify-between border-b border-gray-200 pb-3">
              <span>فرمت محتوا</span>
              <span className="font-semibold">
                {book.isAudiobook ? "mp3" : "PDF"}
              </span>
            </li>

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
        {/* the comments */}
        {activeTab === "reviews" && (
          <div>
            {comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <Comments key={comment.id} comment={comment} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-10">
                هنوز نظری برای این کتاب ثبت نشده است. شما اولین نفر باشید!
              </p>
            )}

            {/* comment form */}
            {isAuthenticated ? (
              <CommentForm bookId={book.id} onCommentSubmit={onCommentSubmit} />
            ) : (
              <div className="mt-8 text-center p-6 bg-gray-50 rounded-lg border">
                <p className="text-gray-700">
                  برای ثبت نظر، ابتدا باید وارد حساب کاربری خود شوید.
                </p>
                <Link
                  to="/login"
                  className="inline-block mt-4 bg-amber-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-amber-600"
                >
                  ورود یا ثبت‌نام
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookTabs;
