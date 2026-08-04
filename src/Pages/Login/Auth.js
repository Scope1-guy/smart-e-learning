import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Logo } from "../../components/SideBar/sidebar";
import programs from "../../data/program";
import "./Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const navigate = useNavigate();

  const { login, signup, error } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleProgram = (programId) => {
    setSelectedPrograms((prev) =>
      prev.includes(programId)
        ? prev.filter((id) => id !== programId)
        : [...prev, programId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const success = login(formData.email, formData.password);
      if (success) {
        navigate("/");
      }
    } else {
      const success = signup(formData, selectedPrograms);
      if (success) {
        navigate("/");
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" }); // clear fields on switch
    setSelectedPrograms([]);
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
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

          {!isLogin && (
            <div className="program-picker">
              <label>Choose your program(s)</label>
              <div className="program-grid">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className={
                      selectedPrograms.includes(program.id)
                        ? "program-card selected"
                        : "program-card"
                    }
                    onClick={() => toggleProgram(program.id)}
                  >
                    {program.title}
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <p className="auth-error">{error}</p>}

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
