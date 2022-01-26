import { useRef } from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  // To render other page
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Pablosocial</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on pablosocial.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              type="text"
              className="registerInput"
              placeholder="Username"
              ref={username}
              required
            />
            <input
              type="email"
              className="registerInput"
              placeholder="Email"
              ref={email}
              required
            />
            <input
              type="password"
              className="registerInput"
              placeholder="Password"
              ref={password}
              required
              minLength="6"
            />
            <input
              type="password"
              className="registerInput"
              placeholder="Password Again"
              ref={passwordAgain}
              required
              minLength="6"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <span className="registerForgot">Forgot Password?</span>
            <button className="registerButton registerButtonRegister">
              Log Into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
