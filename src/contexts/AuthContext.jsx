import { createContext, useContext, useReducer } from "react";

// 1. Create the AuthContext
export const authContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };

    case "REGISTER":
      return { ...state, isAuthenticated: true, user: action.payload };

    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };

    default:
      return state;
  }
}

// AuthProvider component
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function login({ email }) {
    dispatch({ type: "LOGIN", payload: { email } });
  }

  async function register({ email, password }) {
    dispatch({ type: "REGISTER", payload: { email, password } });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login,
    register,
    logout,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;

// useAuth custom hook
export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
