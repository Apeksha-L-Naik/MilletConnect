import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // For Sign Up
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

      if (isSignUp) {
        // After successful sign-up, switch to the login form
        alert("Sign-up successful! Please log in.");
        setIsSignUp(false); // Switch to login mode
      } else {
        // Clear form fields after successful login
        setUsername("");
        setPassword("");

        // Redirect to the home page after successful login
        alert("Login successful! Redirecting to home page...");
        navigate("/home");
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
          'url(https://media.istockphoto.com/id/1419992346/vector/autumn-abstract-background-with-hand-drawn-ears-of-wheat.jpg?s=612x612&w=0&k=20&c=w94usonhzo5-btl1KaDnApG4Gb9BLuqg932o1tcJ6oA=)',
      }}
    >
      <div className="bg-white bg-opacity-95 p-10 rounded-xl shadow-2xl w-96">
        <h1 className="text-3xl text-center text-gray-800 font-bold mb-6">
          {isSignUp ? "Sign Up" : "Login"}
        </h1>
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 px-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full h-12 px-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full h-12 px-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-custom text-white font-semibold rounded-lg shadow-md hover:bg-custom transition"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center text-gray-600 mt-6">
          <p className="text-sm">
            {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              type="button"
              className="text-custom font-semibold hover:underline"
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
