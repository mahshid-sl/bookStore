function BookCard({ book }) {
  return (
    <div className="flex flex-col w-50  items-center shadow-md rounded-lg overflow-hidden">
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-35 object-fit"
      />

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
        <p className="mt-5 text-amber-600 font-bold">
          {book.price.toLocaleString()} تومان
        </p>
        <p className="text-sm text-gray-400">⭐ {book.rating}</p>
      </div>
    </div>
  );
}

export default BookCard;
