import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// Initial state
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

// Context
export const AuthContext = createContext(INITIAL_STATE);

// Wrapper
export const AuthContextProvider = ({ children }) => {
  // Use Reducer
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
