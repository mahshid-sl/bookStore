import { BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function MegaMenu({ categories, pathPrefix, isMobile = false, closeMenu }) {
  //=== state for mobile accordion ===
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // A helper function to create URL-friendly slugs
  const createSlug = (text) => {
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  //============================================
  //=== RENDER FOR MOBILE (ACCORDION)
  //============================================
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 py-4">
        {categories.map((cat, index) => (
          <div key={index}>
            <button
              onClick={() => toggleSubmenu(index)}
              className="flex justify-between items-center w-full text-gray-800 font-bold text-base py-2"
              aria-expanded={openIndex === index}
            >
              <div className="flex items-center gap-2">
                <BookOpen size={18} /> {cat.title}
              </div>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                size={20}
              />
            </button>
            <ul
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              {cat.subcategories.map((sub, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${pathPrefix}/${createSlug(cat.title)}/${createSlug(
                      sub
                    )}`}
                    onClick={() => closeMenu && closeMenu()}
                    className="block py-2 pr-8 text-gray-600 hover:text-amber-500"
                  >
                    {sub}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  //============================================
  //=== RENDER FOR DESKTOP (MEGA MENU)
  //============================================
  return (
    <div
      className="
        absolute top-full left-0 right-0 z-50
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transform -translate-y-2 group-hover:translate-y-0
        transition-all duration-300 ease-in-out
        pointer-events-none group-hover:pointer-events-auto
      "
      role="menu"
    >
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <div key={index} role="none">
              <Link
                to={`/${pathPrefix}/${createSlug(cat.title)}`}
                className="flex items-center gap-2 font-bold text-gray-800 mb-4"
                role="menuitem"
              >
                <BookOpen size={18} /> {cat.title}
              </Link>
              <ul className="space-y-2" role="menu">
                {cat.subcategories.map((sub, idx) => (
                  <li key={idx} role="menuitem">
                    <Link
                      to={`/${pathPrefix}/${createSlug(cat.title)}/${createSlug(
                        sub
                      )}`}
                      className="block p-1 text-gray-600 hover:text-amber-500 transition-colors"
                    >
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;
