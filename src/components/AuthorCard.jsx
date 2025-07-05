import { Link } from "react-router-dom";

function AuthorCard({ author }) {
  if (!author) return null;

  return (
    <Link to={`/author/${author.id}`}>
      <div className="flex flex-col w-64 aspect-[4/5] rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden mx-auto border border-gray-300">
        <img
          src={author.image}
          alt={author.name}
          className="w-full h-full object-cover filter grayscale"
        />
      </div>
      <div className="p-4 flex flex-col justify-center items-center">
        <h3 className="text-lg text-center font-semibold mb-4 border-x-2 border-[#ffddb4] px-2 text-gray-800">
          {author.name}
        </h3>
        <p className="text-gray-700 text-sm text-center line-clamp-2">
          {author.bio}
        </p>
      </div>
    </Link>
  );
}

export default AuthorCard;
