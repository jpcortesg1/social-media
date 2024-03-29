import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/auth/login`,
      userCredentials
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    localStorage.setItem("user", JSON.stringify(res.data));
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
