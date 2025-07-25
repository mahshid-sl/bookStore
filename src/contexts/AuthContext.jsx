import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

export const authContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
    case "UPDATE_USER":
      return { ...state, isAuthenticated: true, user: action.payload };

    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };

    default:
      throw new Error("Unknown action type");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // This effect runs once to check for a persisted session from either storage.
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
    }
  }, []);

  async function login({ email, password, rememberMe }) {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/users?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const userData = data[0];
        // Side effect: Save to the correct storage based on user's choice
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          sessionStorage.setItem("user", JSON.stringify(userData));
        }
        dispatch({ type: "LOGIN", payload: userData });
        toast.success("خوش آمدید!");
        return true;
      } else {
        toast.error("ایمیل یا رمز عبور اشتباه است.");
        return false;
      }
    } catch {
      toast.error("خطایی در ارتباط با سرور رخ داد.");
      return false;
    }
  }

  async function register({ name, lastName, email, password }) {
    try {
      const checkUserRes = await fetch(
        `${import.meta.env.VITE_API_URL}/users?email=${email}`
      );
      const existingUser = await checkUserRes.json();
      if (existingUser.length > 0) {
        toast.error("این ایمیل قبلاً ثبت‌نام شده است.");
        return false;
      }
      const newUserRes = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lastName,
          email,
          password,
          wishlist: [],
          bio: "",
          favoriteGenre: "",
          avatar: "",
        }),
      });
      if (!newUserRes.ok) throw new Error();
      const newUser = await newUserRes.json();

      // After registration, log them in for the current session by default.
      sessionStorage.setItem("user", JSON.stringify(newUser));
      dispatch({ type: "REGISTER", payload: newUser });
      return true;
    } catch {
      toast.error("خطایی در هنگام ثبت‌نام رخ داد.");
      return false;
    }
  }

  function logout() {
    // Side effect: Clear both storages on logout to be safe
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  }

  async function forgotPassword(email) {
    try {
      // We check for the user, but our response to the frontend won't depend on the result.
      await fetch(`${import.meta.env.VITE_API_URL}/users?email=${email}`);

      // ALWAYS show the same success message for security.
      toast.success(
        "اگر حسابی با این ایمیل وجود داشته باشد، لینک بازنشانی برای شما ارسال شد."
      );
      return true;
    } catch (error) {
      // Even on a server error, we show the same message to not reveal system status.
      toast.success(
        "اگر حسابی با این ایمیل وجود داشته باشد، لینک بازنشانی برای شما ارسال شد."
      );
      console.error("Forgot Password Error:", error);
      return false;
    }
  }

  async function updateUser(userId, updatedData) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();

      // Side effect: Update the correct storage
      if (localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(data));
      } else if (sessionStorage.getItem("user")) {
        sessionStorage.setItem("user", JSON.stringify(data));
      }

      dispatch({ type: "UPDATE_USER", payload: data });
      return true;
    } catch {
      toast.error("خطا در به‌روزرسانی اطلاعات.");
      return false;
    }
  }
  function toggleWishlist(bookId) {
    if (!user) return;

    const updatedWishlist = user.wishlist.includes(bookId)
      ? user.wishlist.filter((id) => id !== bookId) // حذف
      : [...user.wishlist, bookId]; // اضافه

    updateUser(user.id, { wishlist: updatedWishlist });
  }

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    forgotPassword,
    toggleWishlist,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export function useAuth() {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthProvider;
