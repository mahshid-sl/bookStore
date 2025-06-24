import { useState } from "react";
import { categories } from "../data/bookCategories";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import MegaMenu from "./MegaMenu";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // close mobile menu===
  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <header className="relative bg-white shadow-sm" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative ">
          {/* logo */}
          <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none h-20">
            <div className="bg-[#fb9e22] text-footer px-3 py-3 rounded-b-md text-sm font-bold leading-tight text-center font-sans pointer-events-auto">
              <Link to="/">
                <span>BOOK</span>
                <br />
                <span>STORE</span>
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
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* desktop : navbar*/}
            <nav
              className="hidden md:flex items-center gap-6 text-[#333333] text-sm font-medium"
              role="navigation"
              aria-label="منوی اصلی"
            >
              <Link
                to="/"
                className="hover:text-[#fb9e22] flex items-center gap-1"
              >
                خانه
              </Link>

              {/* ===electronic books megamenu ===*/}
              <div className="group relative pb-5 -mb-5">
                <button
                  type="button"
                  className="hover:text-[#fb9e22] flex gap-1 items-center h-20"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  کتاب الکترونیک <ChevronDown size={18} />
                </button>
                <MegaMenu categories={categories} />
              </div>

              <div className="group relative pb-5 -mb-5">
                <button
                  type="button"
                  className="hover:text-[#fb9e22] flex gap-1 items-center h-20"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  کتاب صوتی <ChevronDown size={18} />
                </button>
                <MegaMenu categories={categories} />
              </div>

              <Link
                to="/contact-us"
                className="hover:text-[#fb9e22] flex items-center gap-1"
              >
                تماس با ما
              </Link>
            </nav>
          </div>

          {/* ===left-col ===*/}
          <div className="flex items-center gap-4">
            <button
              className="text-[#333333] hover:text-[#fb9e22]"
              aria-label="مشاهده سبد خرید"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>

            <div className="hidden md:flex text-xs items-center gap-2 border-2 border-[#fb9e22] rounded-md px-3 py-1">
              <button className="text-[#333333] hover:text-[#fb9e22]">
                ورود
              </button>
              <span className="text-[#fb9e22] font-extrabold">|</span>
              <button className="text-[#333333] hover:text-[#fb9e22]">
                ثبت‌نام
              </button>
            </div>
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
