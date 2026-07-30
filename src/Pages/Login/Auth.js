import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Logo } from "../../components/SideBar/sidebar";
import "./Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { login, error } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const success = login(formData.email, formData.password);
      if (success) {
        navigate("/");
      }
    } else {
      console.log(isLogin ? "Logging in..." : "Signing up...", formData);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" }); // clear fields on switch
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        {/* <div className="auth-logo">
          <span className="logo-dot"></span> Smart
        </div> */}
        <Logo />
        <h2>{isLogin ? "Welcome back!" : "Join us today!"}</h2>
        <p>
          {isLogin
            ? "Log in to continue your learning journey and pick up right where you left off."
            : "Create an account to start your learning journey with us."}
        </p>
      </div>

      <div className="auth-form-side">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
          <p className="auth-subtext">
            {isLogin
              ? "Enter your details to access your dashboard"
              : "Fill in your details to get started"}
          </p>

          {!isLogin && (
            <>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Grace Stanley"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {isLogin && error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">
            {isLogin ? "Log In" : "Create Account"}
          </button>

          <p className="auth-switch">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span className="auth-toggle-link" onClick={toggleMode}>
              {isLogin ? "Create account" : "Log in"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Auth;
