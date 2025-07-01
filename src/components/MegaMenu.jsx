import { BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function MegaMenu({ categories, pathPrefix, isMobile = false, closeMenu }) {
  //=== mobile state ===
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // A helper function to create URL-friendly slugs
  const createSlug = (text) => {
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  //=== RENDER FOR MOBILE (ACCORDION) ===
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 py-4">
        {categories.map((cat, index) => (
          <div key={index}>
            <button
              onClick={() => toggleSubmenu(index)}
              className="flex justify-between items-center w-full text-[#333333] font-bold text-base py-2"
              aria-expanded={openIndex === index}
              aria-controls={`submenu-mobile-${index}`}
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
              id={`submenu-mobile-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              {cat.subcategories.map((sub, idx) => (
                <li key={idx}>
                  <Link
                    to={`/category/${createSlug(sub)}`}
                    onClick={() => closeMenu && closeMenu()}
                    className="block py-2 pr-8 hover:text-[#fb9e22] cursor-pointer"
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

  //=== RENDER FOR DESKTOP (MEGA MENU) ===
  return (
    <div
      className="absolute top-full right-0 z-50 w-[1050px] gap-2 rounded-lg bg-white p-6 text-sm text-[#333333] shadow-lg
      flex transition-all duration-300 ease-in-out
      transform  invisible group-hover:translate-y-0 group-hover:visible"
      role="menu"
      aria-label="دسته بندی کتاب‌ها"
    >
      {categories.map((cat, index) => (
        <div key={index} role="none" className="min-w-[200px] flex-shrink-0">
          <h3
            className="flex gap-2 font-bold text-[#333333] my-6"
            role="menuitem"
          >
            <BookOpen size={18} /> {cat.title}
          </h3>
          <ul className="space-y-1" role="menu">
            {cat.subcategories.map((sub, idx) => (
              <li key={idx} role="menuitem">
                <Link
                  to={`/${pathPrefix}/${createSlug(sub)}`}
                  className="block p-1 hover:text-[#fb9e22] transition-colors"
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

export default MegaMenu;
