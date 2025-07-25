import { BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function MegaMenu({
  menuTitle,
  categories,
  pathPrefix,
  isMobile = false,
  closeMenu,
}) {
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
      <div className=" pb-1">
        {/* Main Accordion Button (e.g., "کتاب الکترونیک") */}
        <button
          onClick={() => toggleSubmenu("main")}
          className="flex justify-between items-center w-full text-gray-800 font-bold text-md py-2"
        >
          {menuTitle}
          <ChevronDown
            className={`transition-transform duration-300 ${
              openIndex === "main" ? "rotate-180" : ""
            }`}
            size={20}
          />
        </button>
        {/* Submenu with categories */}
        <ul
          className={`overflow-hidden transition-all duration-300 pr-4 ${
            openIndex === "main" ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          {categories.map((cat, idx) => (
            <li key={idx} className="py-1">
              <Link
                // --- FIX: Correct URL structure for main categories ---
                to={`/${pathPrefix}/${createSlug(cat.title)}`}
                onClick={closeMenu}
                className="block py-2 font-semibold text-gray-700 hover:text-amber-500"
              >
                {cat.title}
              </Link>
              <ul className="pr-4">
                {cat.subcategories.map((sub, subIdx) => (
                  <li key={subIdx}>
                    <Link
                      // --- FIX: Correct URL structure for subcategories ---
                      to={`/${pathPrefix}/${createSlug(cat.title)}/${createSlug(
                        sub
                      )}`}
                      onClick={closeMenu}
                      className="block py-2 text-gray-600 hover:text-amber-500"
                    >
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
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
