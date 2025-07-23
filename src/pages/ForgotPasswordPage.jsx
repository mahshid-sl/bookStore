import { ChevronLeft, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    const success = await forgotPassword(data.email);
    if (success) {
      // Handle successful password reset
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }

  return (
    <div className="flex items-center justify-center  bg-gray-50 p-4">
      <div className="relative flex w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-2xl shadow-lg">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="text-right">
            <h1 className="mt-6 text-lg font-extrabold text-gray-900">
              فراموشی رمز عبور
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              ایمیل حساب کاربری خود را وارد کنید تا لینک بازنشانی رمز عبور
              برایتان ارسال شود.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            {/* Email Input */}
            <div>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  className="w-full border border-gray-300 px-10 py-3 text-right rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  placeholder="ایمیل"
                  {...register("email", {
                    required: "وارد کردن ایمیل الزامی است",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "فرمت ایمیل نامعتبر است",
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

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-transform hover:scale-105 disabled:bg-amber-300"
              >
                {isSubmitting ? "در حال ارسال..." : "ارسال لینک بازنشانی"}
              </button>
            </div>

            <div className="text-center pt-4">
              <Link
                to="/login"
                className="flex items-center justify-center gap-1 text-sm font-medium text-amber-500 hover:underline"
              >
                <span>بازگشت به صفحه ورود</span>
                <ChevronLeft size={16} />
              </Link>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            className="h-full w-full object-cover"
            src="./images/newbook_bg.png"
            alt="فراموشی رمز عبور"
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/800x1200/333/FFF?text=Books")
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
