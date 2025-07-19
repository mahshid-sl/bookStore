import { Star } from "lucide-react";

function Comments({ comment }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="font-bold text-gray-800">{comment.userName}</p>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < comment.rating
                  ? "text-amber-400 fill-current"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
      </div>
      <p className="text-gray-600 mt-2 text-right leading-relaxed">
        {comment.text}
      </p>
      <p className="text-xs text-gray-400 mt-3 text-left">
        {new Date(comment.date).toLocaleDateString("fa-IR")}
      </p>
    </div>
  );
}

export default Comments;
