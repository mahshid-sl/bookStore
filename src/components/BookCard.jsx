import { BookOpen, FileAudio, StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  // guard clause
  if (!book) return null;

  const authorName = book.author ? book.author.name : "نویسنده نامشخص";
  return (
    <Link to={`/books/${book.id}`}>
      <div className="flex flex-col w-40 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden mx-auto ">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-fill"
        />

        <div className="p-3 text-center space-y-1">
          {/* booksTitle*/}
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {book.title}
          </h3>

          <p className="text-xs text-gray-500 flex justify-center items-center gap-1">
            {book.isAudiobook ? (
              <FileAudio size={14} className="text-gray-400" />
            ) : (
              <BookOpen size={14} className="text-gray-400" />
            )}
            {authorName}
          </p>

          <div className="mt-2 space-y-0.5">
            <p className="text-sm text-amber-600 font-bold">
              {book.price.toLocaleString()} تومان
            </p>
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1 pt-1">
              <StarIcon size={16} className="text-amber-400 fill-amber-400" />
              {book.rating.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
