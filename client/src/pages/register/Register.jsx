import "./register.css";

export default function Register() {
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
          <div className="registerBox">
            <input
              type="text"
              className="registerInput"
              placeholder="Username"
            />
            <input type="email" className="registerInput" placeholder="Email" />
            <input
              type="password"
              className="registerInput"
              placeholder="Password"
            />
            <input
              type="password"
              className="registerInput"
              placeholder="Password Again"
            />
            <button className="registerButton">Sign Up</button>
            <span className="registerForgot">Forgot Password?</span>
            <button className="registerButton registerButtonRegister">
              Log Into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
