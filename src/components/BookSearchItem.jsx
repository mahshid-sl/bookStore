import { Link } from "react-router-dom";

function BookSearchItem({ book, onClear }) {
  return (
    <li className="hover:bg-gray-200 rounded-md ">
      <Link
        to={`/books/${book.id}`}
        onClick={onClear} // Clear search when an item is clicked
        className="flex items-center gap-4 p-2"
      >
        <img
          src={book.image}
          alt={book.title}
          className="w-12 h-16 object-cover rounded"
        />
        <div className="text-right">
          <p className="font-semibold text-sm text-gray-800">{book.title}</p>
          <p className="text-xs text-gray-500">{book.author?.name}</p>
        </div>
      </Link>
    </li>
  );
}

export default BookSearchItem;
