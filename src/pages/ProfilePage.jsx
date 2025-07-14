import { Link, useNavigate } from "react-router-dom";
import {
  User,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronLeft,
  Camera,
  Edit,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// کامپوننت قابل استفاده مجدد برای فیلدهای فرم
function ProfileInput({ id, label, type = "text", value, icon, onChange }) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-500 peer text-right"
        placeholder=" "
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[1] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 right-1"
      >
        {label}
      </label>
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    bio: "",
    favoriteGenre: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        lastName: user.lastName || "",
        email: user.email || "",
        bio: user.bio || "",
        favoriteGenre: user.favoriteGenre || "",
      });
    }
  }, [user]);

  function handleInputChange(e) {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!", formData);
    toast.success("تغییرات با موفقیت ذخیره شد!");
  };

  function handleLogout() {
    logout();
    toast.success("با موفقیت خارج شدید!");
    navigate("/");
  }

  if (!user) {
    // A simple loading state while user data is being fetched from context
    return <div>در حال بارگذاری اطلاعات کاربر...</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8 items-center justify-start">
          <Link to="/" className="hover:text-amber-500">
            خانه
          </Link>
          <ChevronLeft size={20} className="mx-1" />
          <span className="font-semibold text-gray-700">حساب کاربری</span>
        </nav>

        {/* Main Layout: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex flex-col items-center pb-4 border-b">
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${formData.name}+${formData.lastName}&background=fb9e22&color=fff`
                  }
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full"
                />
                <h3 className="mt-4 font-bold text-lg">
                  {formData.name} {formData.lastName}
                </h3>
                <p className="text-sm text-gray-500">{formData.email}</p>
              </div>
              <nav className="mt-4 space-y-1 text-right">
                <Link
                  to="/profile"
                  className="flex items-center justify-end gap-3 px-4 py-2 text-sm font-medium rounded-md bg-amber-100 text-amber-700"
                >
                  <span>ویرایش پروفایل</span>
                  <User size={18} />
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center justify-end gap-3 px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <span>سفارش‌های من</span>
                  <ShoppingBag size={18} />
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center justify-end gap-3 px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <span>علاقه‌مندی‌ها</span>
                  <Heart size={18} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-end gap-3 px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <span>خروج از حساب</span>
                  <LogOut size={18} />
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content: Profile Form */}
          <main className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-md space-y-8"
            >
              <div className="flex items-center gap-6 pb-6 border-b">
                <div className="relative">
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${formData.name}+${formData.lastName}&background=fb9e22&color=fff`
                    }
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-full"
                  />
                  <button
                    type="button"
                    className="absolute -bottom-2 -left-2 bg-white p-2 rounded-full border shadow-sm hover:bg-gray-100"
                  >
                    <Camera size={16} className="text-gray-600" />
                  </button>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    اطلاعات حساب کاربری
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    اطلاعات پروفایل خود را اینجا ویرایش کنید.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileInput
                  id="name"
                  label="نام"
                  value={formData.name}
                  onChange={handleInputChange}
                  icon={<Edit size={16} />}
                />
                <ProfileInput
                  id="lastName"
                  label="نام خانوادگی"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  icon={<Edit size={16} />}
                />
                <ProfileInput
                  id="email"
                  type="email"
                  label="ایمیل"
                  value={formData.email}
                  onChange={handleInputChange}
                  icon={<Edit size={16} />}
                />
                <ProfileInput
                  id="favoriteGenre"
                  label="ژانر مورد علاقه"
                  value={formData.favoriteGenre}
                  onChange={handleInputChange}
                  icon={<Edit size={16} />}
                />
              </div>

              <div className="sm:col-span-2">
                <ProfileInput
                  id="bio"
                  label="درباره من"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>

              <div className="text-left pt-6 border-t">
                <button
                  type="submit"
                  className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-600 transition"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
