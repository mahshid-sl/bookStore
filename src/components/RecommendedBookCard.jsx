// import { Feather, PenTool, UserPen } from "lucide-react";
// import { Link } from "react-router-dom";

// function RecommendedBookCard({ book }) {
//   // guard clause
//   if (!book) return null;
//   return (
//     <div className="flex flex-col items-center justify-center">
//       <div className="flex flex-col w-40 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden z-10 ">
//         <img
//           src={book.image}
//           alt={book.title}
//           className="w-full h-48 object-fill"
//         />
//       </div>
//       {/* =====book--border===== */}
//       <div className="px-3 py-10 text-right space-y-2.5 border-2 border-amber-400 rounded-md w-72 flex flex-col justify-center items-center -mt-7 z-0 aspect-[5/4]">
//         {/* booksTitle*/}
//         <div className="text-sm font-semibold text-gray-800 line-clamp-1 flex items-center justify-center gap-1.5">
//           <Feather size={15} fill="#a7a6a6" />
//           {book.title}
//         </div>
//         {/* authorName */}
//         <div className="flex items-center gap-1.5 ">
//           <PenTool size={15} fill="#FB9E22" color="#794705" />
//           <p>{book.author.name}</p>
//         </div>
//         {/* bookPreview */}
//         <p className="line-clamp-3">{book.previewText}</p>
//       </div>
//     </div>
//   );
// }

// export default RecommendedBookCard;

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
