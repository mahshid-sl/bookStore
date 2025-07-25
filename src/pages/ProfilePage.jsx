import { Link, useNavigate } from "react-router-dom";
import {
  User,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronLeft,
  Camera,
  Edit,
  Check,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// profile input component
function ProfileInput({
  id,
  label,
  type = "text",
  register,
  validationRules,
  isEditing,
  onEditToggle,
  error,
}) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        className={`block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border
        ${error ? "border-red-500" : "border-gray-300"}
        appearance-none focus:outline-none focus:ring-0 focus:border-amber-500 peer text-right disabled:bg-gray-50 disabled:cursor-not-allowed`}
        placeholder=" "
        disabled={!isEditing}
        {...register(id, validationRules)}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[1] bg-white peer-disabled:bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 right-1"
      >
        {label}
      </label>
      <button
        type="button"
        onClick={() => onEditToggle(id)}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500"
      >
        {isEditing ? <Check size={20} /> : <Edit size={16} />}
      </button>
      {error && (
        <p className="text-xs text-red-500 mt-1 mr-1">{error.message}</p>
      )}
    </div>
  );
}

// profile page component
function ProfilePage() {
  const { user, logout, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const [editingField, setEditingField] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Watch form values to update sidebar in real-time
  const watchedFormData = watch();

  // Effect 1: Redirects if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        lastName: user.lastName || "",
        email: user.email || "",
        bio: user.bio || "",
        favoriteGenre: user.favoriteGenre || "",
      });
      setImagePreview(null);
    }
  }, [user, reset]);

  const handleEditToggle = (fieldId) => {
    setEditingField((prevField) => (prevField === fieldId ? null : fieldId));
  };

  const onSubmit = async (data) => {
    const dataToUpdate = { ...data };

    const hasChanges =
      Object.entries(dataToUpdate).some(
        ([key, value]) => user[key] !== value
      ) || !!imagePreview;

    if (!hasChanges) {
      toast("هیچ تغییری اعمال نشده است.");
      return;
    }
    if (imagePreview) {
      dataToUpdate.avatar = imagePreview;
    }

    const success = await updateUser(user.id, dataToUpdate);

    if (success) {
      toast.success("تغییرات با موفقیت ذخیره شد!");
      setEditingField(null);
      setImagePreview(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <div>در حال بارگذاری اطلاعات کاربر...</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex text-xs sm:text-sm text-gray-500 mb-8 items-center justify-start">
          <Link to="/" className="hover:text-amber-500">
            خانه
          </Link>
          <ChevronLeft size={20} className="mx-1" />
          <span className="font-semibold text-gray-700">حساب کاربری</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ===== Sidebar  ===== */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex flex-col items-center pb-4 border-b">
                <img
                  src={
                    imagePreview ||
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${watchedFormData.name}+${watchedFormData.lastName}&background=fb9e22&color=fff`
                  }
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full"
                />
                <h3 className="mt-4 font-bold text-md">
                  {watchedFormData.name} {watchedFormData.lastName}
                </h3>
                <p className="text-sm text-gray-500">{watchedFormData.email}</p>
              </div>
              <nav className="flex flex-col items-start space-y-1 text-right">
                <Link
                  to="/profile"
                  className="flex w-full items-center justify-start gap-3 px-4 py-2 text-sm font-medium rounded-md bg-amber-100 text-amber-700"
                >
                  <User size={18} />
                  <span>ویرایش پروفایل</span>
                </Link>
                <Link
                  to="/orders"
                  className="flex  w-full items-center justify-start gap-3 px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <ShoppingBag size={18} />
                  <span>سفارش‌های من</span>
                </Link>
                <button className="flex  w-full items-center justify-start gap-3 px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
                  <Heart size={18} />
                  <span>علاقه‌مندی‌ها</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-start gap-3 px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <LogOut size={18} />
                  <span>خروج از حساب</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content: Profile Form */}
          <main className="lg:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-8 rounded-lg shadow-md space-y-8"
            >
              {/* ===== بخش عکس پروفایل (اضافه شده) ===== */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
              />
              <div className="flex items-center gap-6 pb-6 border-b">
                <div className="relative">
                  <img
                    src={
                      imagePreview ||
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${watchedFormData.name}+${watchedFormData.lastName}&background=fb9e22&color=fff`
                    }
                    alt="Profile"
                    className="w-full object-cover rounded-full"
                  />
                  <button
                    type="button"
                    onClick={handleCameraClick}
                    className="absolute -bottom-2 -left-2 bg-white p-2 rounded-full border shadow-sm hover:bg-gray-100"
                  >
                    <Camera className="text-gray-600 w-3 h-3" />
                  </button>
                </div>
                <div>
                  <h2 className="text-sm sm:text-md font-bold text-gray-800">
                    اطلاعات حساب کاربری
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    اطلاعات پروفایل خود را اینجا ویرایش کنید.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                <ProfileInput
                  id="name"
                  label="نام"
                  register={register}
                  validationRules={{ required: "نام الزامی است" }}
                  isEditing={editingField === "name"}
                  onEditToggle={handleEditToggle}
                  error={errors.name}
                />
                <ProfileInput
                  id="lastName"
                  label="نام خانوادگی"
                  register={register}
                  validationRules={{ required: "نام خانوادگی الزامی است" }}
                  isEditing={editingField === "lastName"}
                  onEditToggle={handleEditToggle}
                  error={errors.lastName}
                />
                <ProfileInput
                  id="email"
                  type="email"
                  label="ایمیل"
                  register={register}
                  validationRules={{
                    required: "ایمیل الزامی است",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "فرمت ایمیل معتبر نیست",
                    },
                  }}
                  isEditing={editingField === "email"}
                  onEditToggle={handleEditToggle}
                  error={errors.email}
                />
                <ProfileInput
                  id="favoriteGenre"
                  label="ژانر مورد علاقه"
                  register={register}
                  isEditing={editingField === "favoriteGenre"}
                  onEditToggle={handleEditToggle}
                  error={errors.favoriteGenre}
                />
              </div>

              <div className="sm:col-span-2">
                <ProfileInput
                  id="bio"
                  label="درباره من"
                  register={register}
                  isEditing={editingField === "bio"}
                  onEditToggle={handleEditToggle}
                  error={errors.bio}
                />
              </div>

              <div className="text-left pt-6 border-t">
                <button
                  type="submit"
                  className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-600 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
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
