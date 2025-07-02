import { useState } from "react";
import { categories } from "../data/bookCategories";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import AuthButtons from "./AuthButtons";

const navMenuItems = [
  { title: "کتاب الکترونیک", categories: categories, pathPrefix: "ebooks" },
  { title: "کتاب صوتی", categories: categories, pathPrefix: "audiobooks" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [itemCount, setItemCount] = useState(2); // change later just for testing ui

  // close mobile menu===
  const closeMobileMenu = () => setMenuOpen(false);

  // common nav link classes
  const navLinkClasses =
    "hover:text-[#fb9e22] flex items-center gap-1 transition-colors duration-300";

  return (
    <header
      className="relative bg-white shadow-sm overflow-hidden"
      role="banner "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative ">
          {/*=== logo === */}
          <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none h-20">
            <div className="bg-[#fb9e22] px-3 py-3 rounded-b-md text-sm font-bold leading-tight text-center font-sans pointer-events-auto">
              <Link
                to="/"
                className="flex flex-col justify-center items-center gap-1 "
              >
                <span className="">BOOK</span>
                <span className="font-medium text-[#333333]">STORE</span>
              </Link>
            </div>
          </div>

          {/* ===right-col ===*/}
          <div className="flex items-center gap-6">
            {/* mobile icon*/}
            <button
              className="md:hidden text-[#333333]"
              aria-label={menuOpen ? "closeMenu" : "openMenu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* desktop : navbar*/}
            <nav
              relative="true"
              className="hidden md:flex items-center
              md:gap-4 lg:gap-6 text-[#333333] md:text-xs md:font-semibold lg:text-sm font-medium
              "
              role="navigation"
              aria-label="منوی اصلی"
            >
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${navLinkClasses} ${isActive ? "text-[#fb9e22]" : ""}`
                }
              >
                خانه
              </NavLink>

              {/* ===books megamenu ===*/}
              {navMenuItems.map((item) => (
                <div key={item.title} className="group">
                  <button type="button" className={`${navLinkClasses} h-20`}>
                    {item.title} <ChevronDown size={18} />
                  </button>
                  {/* 2. به مگامنو، شناسه‌ی مسیر و دسته‌بندی مخصوص خودش را پاس می‌دهیم */}
                  <MegaMenu
                    categories={item.categories}
                    pathPrefix={item.pathPrefix}
                  />
                </div>
              ))}

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${navLinkClasses} ${isActive ? "text-[#fb9e22]" : ""}`
                }
              >
                تماس با ما
              </NavLink>
            </nav>
          </div>

          {/* ===left-col ===*/}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative text-[#333333] hover:text-[#fb9e22] transition-colors duration-300"
              aria-label="مشاهده سبد خرید"
            >
              <ShoppingBag size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-300 text-xs font-bold text-[#333333]">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* ===login=== */}
            <AuthButtons />
          </div>
        </div>
        {/* ===mobile menu=== */}
        {menuOpen && (
          <nav
            className="md:hidden mt-4 text-[#333333] border-t border-gray-200"
            role="menu"
            aria-label="منوی موبایل"
          >
            <MegaMenu
              categories={categories}
              isMobile={true}
              closeMenu={closeMobileMenu}
            />
          </nav>
        )}
      </div>
    </header>
  );
}
export default Header;
