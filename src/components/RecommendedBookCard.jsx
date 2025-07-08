import { Feather, PenTool } from "lucide-react";

function RecommendedBookCard({ book }) {
  if (!book) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xs mx-auto ">
      <div className="w-1/2 aspect-[2/3] bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden z-10">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-fill"
        />
      </div>

      {/* border of book info */}
      <div className="w-full px-4 pt-12 pb-4 text-center space-y-4 border-2 border-amber-400 rounded-md flex flex-col justify-center items-center -mt-10 z-0 aspect-[5/4]">
        {/* book title */}
        <div className="font-semibold text-gray-800 line-clamp-1 flex items-center justify-center gap-1.5">
          <Feather size={15} className="text-gray-500" />
          <h3 className="text-sm">{book.title}</h3>
        </div>

        {/* author name */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <PenTool size={15} className="text-amber-600" />
          <p>{book.author?.name}</p>
        </div>

        {/* book preview */}
        <p className="line-clamp-3 text-sm text-gray-500">{book.previewText}</p>
      </div>
    </div>
  );
}

export default RecommendedBookCard;
