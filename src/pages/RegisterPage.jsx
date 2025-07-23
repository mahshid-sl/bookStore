import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Lock, Mail, Eye, EyeOff, User } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

// A simple SVG component for Google Icon
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.196C34.976 5.822 29.864 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306 14.691c-1.428 2.92-2.306 6.223-2.306 9.691s.878 6.771 2.306 9.691l-4.98-3.903C1.169 27.932 1 26.023 1 24s.169-3.932 .326-5.788l4.98 3.899z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24 48c5.166 0 9.86-1.977 13.409-5.192l-4.781-3.776c-2.03 1.456-4.596 2.296-7.628 2.296c-5.22 0-9.643-3.334-11.303-7.918l-4.98 3.903C9.239 42.922 16.138 48 24 48z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.16-4.082 5.571l4.781 3.776C40.098 33.683 42.93 28.636 43.611 20.083z"
    ></path>
  </svg>
);

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  // rename to avoid conflict
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, lastName, email, password } = data;

    const isSuccess = await registerUser({ name, lastName, email, password });

    if (isSuccess) {
      toast.success("ثبت‌نام شما با موفقیت انجام شد. به بوک استور خوش آمدید!");
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 p-4">
        <div className="relative flex w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-2xl shadow-lg">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12">
            <div className="text-right">
              <Link to="/" className="text-amber-500 font-bold text-2xl">
                به بوکــــ استـور خوش اومدی :)
              </Link>
              <h1 className="mt-6 text-2xl font-extrabold text-gray-900">
                ثبت‌نام و ساخت حساب کاربری
              </h1>
              <p className="mt-2 text-gray-600">
                حساب کاربری دارید؟{" "}
                <Link
                  to="/login"
                  className="font-semibold text-amber-500 hover:underline text-sm"
                >
                  ورود
                </Link>
              </p>
            </div>

            {/* form inputs */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              {/* name Input */}
              <div>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full border border-gray-300 px-10 py-3 text-right rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    placeholder="نام"
                    {...register("name", { required: "نام الزامی است" })}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 text-right">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* lastName Input */}
              <div>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="name"
                    required
                    className="w-full border border-gray-300 px-10 py-3 text-right rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    placeholder="نام خانوادگی"
                    {...register("lastName", {
                      required: "نام خانوادگی الزامی است",
                    })}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500 text-right">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="w-full border border-gray-300 px-10 py-3 text-right rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    placeholder="ایمیل"
                    {...register("email", {
                      required: "ایمیل الزامی است",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "ایمیل نامعتبر است",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 text-right">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="w-full border border-gray-300 px-10 py-3 text-right rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    placeholder="رمز عبور"
                    {...register("password", {
                      required: "رمز عبور الزامی است",
                      minLength: {
                        value: 6,
                        message: "رمز عبور باید حداقل 6 کاراکتر باشد",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 text-right">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-transform hover:scale-105"
                >
                  {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400">یا</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Social Login */}
              <div>
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <GoogleIcon />
                  <span>ورود با گوگل</span>
                </button>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden lg:block lg:w-1/2">
            <img
              className="h-full w-full object-cover"
              src="./images/newbook_bg.png"
              alt="کتاب‌ها"
              onError={(e) =>
                (e.target.src =
                  "https://placehold.co/800x1200/333/FFF?text=Books")
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
