import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

// 1. Create the AuthContext
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
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, isAuthenticated: true, user: action.payload };

    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...state, isAuthenticated: false, user: null };

    default:
      throw new Error("Unknown action type");
  }
}

// AuthProvider component
function AuthProvider({ children }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  async function login({ email, password }) {
    try {
      const res = await fetch(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        dispatch({ type: "LOGIN", payload: data[0] });
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
      // Step 1: Check if user already exists
      const checkUserRes = await fetch(
        `http://localhost:3001/users?email=${email}`
      );
      const existingUser = await checkUserRes.json();

      if (existingUser.length > 0) {
        toast.error("این ایمیل قبلاً ثبت‌نام شده است.");
        return false;
      }

      // Step 2: Create the new user if they don't exist
      const newUserRes = await fetch(`http://localhost:3001/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      if (!newUserRes.ok) {
        throw new Error("خطایی در هنگام ثبت‌نام رخ داد.");
      }

      const newUser = await newUserRes.json();

      // Step 3: Dispatch the new user to update the state
      dispatch({
        type: "REGISTER",
        payload: newUser,
      });

      return true;
    } catch {
      toast.error("خطایی در هنگام ثبت‌نام رخ داد.");
      return false;
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  async function updateUser(userId, updatedData) {
    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      dispatch({ type: "UPDATE_USER", payload: data });
      return true;
    } catch {
      toast.error("خطا در به‌روزرسانی اطلاعات.");
      return false;
    }
  }

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

// useAuth custom hook
export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthProvider;
