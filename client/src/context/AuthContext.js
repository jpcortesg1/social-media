import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// Initial state
const INITIAL_STATE = {
  user: {
    _id: "61e8d8c809af7e0cfdb1f341",
    username: "Jane",
    email: "jane@mail.com",
    password: "$2b$10$jpmTWZM1xSuIl./TnpwHyuOF9bs0TPu2p5VbNL0qJtK.8TRqEyLAO",
    profilePicture: "person/1.jpeg",
    coverPicture: "post/1.jpeg",
    followers: [],
    followings: ["61e8cc5e6ee65da76706c582", "61e8cc6d6ee65da76706c584"],
    isAdmin: false,
    createdAt: { $date: { $numberLong: "1642649800645" } },
    updatedAt: { $date: { $numberLong: "1642887215237" } },
    __v: { $numberInt: "0" },
    city: "New York",
    desc: "Hey its my description",
    from: "Milan",
    relationship: { $numberInt: "1" },
  },
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
