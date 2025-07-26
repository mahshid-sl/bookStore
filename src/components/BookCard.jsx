import { BookOpen, FileAudio, Heart, StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function BookCard({ book }) {
  const { user } = useAuth();
  if (!book) return null;

  const authorName = book.author ? book.author.name : "نویسنده نامشخص";
  const isFavorite = user?.wishlist?.includes(book.id);

  return (
    <Link to={`/books/${book.id}`} className="group relative block">
      <div className="flex flex-col w-full bg-white rounded-md shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:-translate-y-2">
        <div className="aspect-[9/8] w-full overflow-hidden">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-fill"
          />
        </div>

        <div className="p-3 text-center space-y-1 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
              {book.title}
            </h3>
            <p className="text-xs text-gray-500 flex justify-center items-center gap-1 mt-1">
              {book.isAudiobook ? (
                <FileAudio size={14} className="text-gray-400" />
              ) : (
                <BookOpen size={14} className="text-gray-400" />
              )}
              {authorName}
            </p>
          </div>

          <div className="mt-2 space-y-1">
            <p className="text-sm text-amber-600 font-bold">
              {book.price.toLocaleString()} تومان
            </p>
            <div className="text-xs text-gray-400 flex items-center justify-center gap-1 pt-1">
              <StarIcon size={16} className="text-amber-400 fill-amber-400" />
              {book.rating.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Display a heart icon if the book is in the wishlist */}
      {isFavorite && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md">
          <Heart size={16} className="text-red-500 fill-current" />
        </div>
      )}
    </Link>
  );
}

export default BookCard;
