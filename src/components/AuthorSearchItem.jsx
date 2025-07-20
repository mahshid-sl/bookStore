import { Link } from "react-router-dom";

function AuthorSearchItem({ author, onClear }) {
  return (
    <li className="hover:bg-gray-200 rounded-md ">
      <Link
        to={`/author/${author.id}`}
        onClick={onClear} // Clear search when an item is clicked
        className="flex items-center gap-4 p-2"
      >
        <img
          src={author.image}
          alt={author.name}
          className="w-12 h-16 object-cover rounded"
        />
        <div className="text-right">
          <p className="font-semibold text-sm text-gray-800">{author.name}</p>
          <p className="text-xs text-gray-500">صفحه نویسنده</p>
        </div>
      </Link>
    </li>
  );
}

export default AuthorSearchItem;
