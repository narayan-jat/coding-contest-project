import React from "react";
import { TextInputField } from "../../../utilities/FormComponents";
import { useUser } from "../../../context/user";
import { useNavigate, Link } from 'react-router-dom';
import { useFormHandler } from "../contest creation/FormHandlers";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { current: user, login } = useUser()
  const { formData: loginData, handleInputChange } = useFormHandler({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password);
      if (user){
        navigate('/host');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit}>
          <TextInputField
            label="Email"
            type="email"
            controlClass={"login-input"}
            placeholder="Enter your email"
            required={true}
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
          />
          <TextInputField
            label="Password"
            type="password"
            controlClass={"login-input"}
            placeholder="Enter your password"
            required={true}
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <div className="login-links">
          <Link to="" className="forgot-password">
            Forgot <span>Password?</span>
          </Link>
          <p>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;