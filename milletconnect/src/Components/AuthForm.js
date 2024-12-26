import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // For Sign Up
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null); // To display error messages
  const [isLoading, setIsLoading] = useState(false); // To show loading indicator
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setIsLoading(true); // Start loading indicator

    const endpoint = isSignUp ? "/sign_up" : "/sign_in"; // Choose the API endpoint
    const payload = isSignUp
      ? { Name: username, Password: password, Email: email }
      : { Name: username, Password: password };

    try {
      const response = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Clear form fields after success
      setUsername("");
      setPassword("");
      setEmail("");

      if (isSignUp) {
        alert("Sign-up successful! Redirecting to home page...");
        navigate("/home"); // Navigate to the home page after successful sign-up
      } else {
        alert("Login successful!");
        navigate("/home"); // Navigate to the home page
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://media.post.rvohealth.io/wp-content/uploads/2020/07/What%E2%80%99s-the-Difference-Between-Barley-and-Wheat-02-1200x628.jpg)',
      }}
    >
      <div className="bg-yellow bg-opacity-30 backdrop-blur-xl p-10 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl text-center text-white mb-6">
          {isSignUp ? "Sign Up" : "Login"}
        </h1>
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-12 px-4 pl-10 bg-transparent text-white border-2 border-white rounded-full placeholder-white focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="bx bxs-envelope absolute top-1/2 left-3 transform -translate-y-1/2 text-white"></i>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full h-12 px-4 pl-10 bg-transparent text-white border-2 border-white rounded-full placeholder-white focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <i className="bx bxs-user absolute top-1/2 left-3 transform -translate-y-1/2 text-white"></i>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full h-12 px-4 pl-10 bg-transparent text-white border-2 border-white rounded-full placeholder-white focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt absolute top-1/2 left-3 transform -translate-y-1/2 text-white"></i>
            </div>
          </div>

          {!isSignUp && (
            <div className="flex justify-between items-center text-white mb-6">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2 accent-white"
                />
                Remember Me
              </label>
              <a href="#" className="text-sm hover:underline">
                Forgot Password
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full h-12 bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center text-white mt-6">
          <p className="text-sm">
            {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              type="button"
              className="text-sm font-semibold hover:underline"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null); // Clear error when switching forms
              }}
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
