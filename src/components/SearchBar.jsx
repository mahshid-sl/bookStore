import { Search } from "lucide-react";

function SearchBar() {
  return (
    <section className=" py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="نام کتاب،نویسنده و ..."
              className="w-full pr-12 pl-4 py-3 text-right 
              bg-[#f2f2f2] text-gray-600 placeholder:text-gray-400
            rounded-lg  focus:ring-orange-500 focus:border-transparent
            focus:outline-2 focus:-outline-offset-2 focus:outline-orange-300
            "
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#fb9e22] h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;
