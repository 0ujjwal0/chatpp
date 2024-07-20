import React, { useState } from "react";

const Signup = () => <div>Signup</div>;
const Signin = () => <div>Signin</div>;

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState("signin");

  return (
    <div className="bg-gray-200 h-screen flex flex-col items-center justify-center">
      <div className="text-3xl font-bold mb-8 ">TALKE</div>
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 border rounded-lg bg-white shadow-md">
        <div className="flex w-full justify-around mb-4">
          <button
            className={`px-6 py-2 rounded-full ${
              activeComponent === "signin"
                ? "bg-blue-200 text-gray-700"
                : "bg-gray-100"
            }`}
            onClick={() => setActiveComponent("signin")}
          >
            Login
          </button>
          <button
            className={`px-6 py-2 rounded-full ${
              activeComponent === "signup"
                ? "bg-blue-200 text-gray-700"
                : "bg-gray-100"
            }`}
            onClick={() => setActiveComponent("signup")}
          >
            Sign Up
          </button>
        </div>
        <div className="w-full mt-4">
          {activeComponent === "signup" && <Signup />}
          {activeComponent === "signin" && <Signin />}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
