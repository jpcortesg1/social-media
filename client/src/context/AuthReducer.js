const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    case "FOLLOW":
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...state.user,
          followings: [...state.user.followings, action.payload],
        })
      );
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };

    case "UNFOLLOW":
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...state.user,
          followings: state.user.followings.filter(
            (idUser) => idUser !== action.payload
          ),
        })
      );
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (idUser) => idUser !== action.payload
          ),
        },
      };

    default:
      return state;
  }
};

export default AuthReducer;
