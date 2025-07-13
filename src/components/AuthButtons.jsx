import { LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AuthButtons() {
  const { isAuthenticated, user, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <>
        {/* Mobile View: User Profile Icon */}
        <div className="md:hidden">
          <Link to="/profile" className="text-[#333333] hover:text-[#fb9e22]">
            <User />
          </Link>
        </div>

        {/* Desktop View: Profile and Logout Buttons */}
        <div className="hidden md:flex text-xs items-center gap-2">
          <Link
            to="/profile"
            className="text-[#333333] hover:text-[#fb9e22] px-3 py-1 border-2 border-transparent rounded-md"
          >
            {user ? user.email : "حساب کاربری"}
          </Link>
          <button
            onClick={logout}
            className="bg-[#fb9e22] text-white hover:bg-orange-500 rounded-md px-3 py-1.5"
          >
            خروج
          </button>
        </div>
      </>
    );
  }
  // when user is not logged in===
  return (
    <>
      <div>
        {/* mobile login=== */}
        <div className="md:hidden">
          <Link
            to="/login"
            className="text-[#333333]  hover:text-[#fb9e22] transition-colors duration-300"
          >
            <LogIn />
          </Link>
        </div>

        {/* Desktop View: Login and Register Buttons */}
        <div className="hidden md:flex text-xs items-center gap-2 border-2 border-[#fb9e22] rounded-md px-3 py-1">
          <Link to="/login" className="text-[#333333] hover:text-[#fb9e22]">
            ورود
          </Link>
          <span className="text-[#fb9e22] font-extrabold">|</span>
          <Link to="/register" className="text-[#333333] hover:text-[#fb9e22]">
            ثبت‌نام
          </Link>
        </div>
      </div>
    </>
  );
}

export default AuthButtons;
