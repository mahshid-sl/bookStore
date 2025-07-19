import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import { Star, Send } from "lucide-react";
import toast from "react-hot-toast";

function CommentForm({ bookId, onCommentSubmit }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText || rating === 0) {
      toast.error("لطفاً امتیاز و متن نظر خود را وارد کنید.");
      return;
    }

    const newComment = {
      bookId: bookId,
      userId: user.id,
      userName: `${user.name} ${user.lastName}`,
      rating: rating,
      text: commentText,
      date: new Date().toISOString(),
    };

    onCommentSubmit(newComment);
    setCommentText("");
    setRating(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 p-6 bg-white rounded-lg border"
    >
      <h3 className="text-xl font-bold text-right mb-4">نظر خود را ثبت کنید</h3>
      <div className="flex items-center justify-end gap-2 mb-4">
        <span className="text-sm text-gray-600">امتیاز شما:</span>
        <div className="flex flex-row-reverse">
          {[...Array(5)].map((_, i) => {
            const ratingValue = 5 - i;
            return (
              <button
                type="button"
                key={ratingValue}
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHoverRating(ratingValue)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  size={24}
                  className={`cursor-pointer transition-colors ${
                    ratingValue <= (hoverRating || rating)
                      ? "text-amber-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows="4"
        className="w-full border-gray-300 p-3 text-right rounded-lg focus:ring-2 focus:ring-amber-500 transition"
        placeholder="نظر خود را اینجا بنویسید..."
      ></textarea>
      <div className="text-left mt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-amber-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-amber-600 transition"
        >
          <Send size={16} />
          ارسال نظر
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
