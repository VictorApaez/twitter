"use client";
import React, { useState } from "react";

export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {isLoginMode ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-500">Login</h2>
            <form>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded mb-4"
              />
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-500">Signup</h2>
            <form>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded mb-4"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 border rounded mb-4"
              />
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Signup
              </button>
            </form>
          </div>
        )}
        <button
          onClick={toggleMode}
          className="w-full p-2 mt-4 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Switch to {isLoginMode ? "Signup" : "Login"}
        </button>
      </div>
    </div>
  );
}
