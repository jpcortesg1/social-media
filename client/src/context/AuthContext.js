import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// Initial state
const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

// Context
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthContext, INITIAL_STATE);

  return (
    <AuthContext.Provider
      values={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.err,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
