import React, { useState, useEffect } from "react";
import Signin from "../components/signin";
import Signup from "../components/signup";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState("signin");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <div className="bg-backg1 bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-between h-3/4 w-full max-w-md border rounded-lg shadow-2xl">
        {activeComponent === "signin" && (
          <>
            <div className="bg-backg1 bg-cover bg-center bg-no-repeat w-full h-full flex flex-col items-center justify-evenly">
              <div className="flex flex-col items-center justify-evenly ">
                <p className="text-rose-300 p-2 cursor-default">
                  Don't you have an account?
                </p>
                <button
                  className="px-2 py-1 rounded-full hover:border border-rose-300  hover:text-rose-200 text-gray-800"
                  onClick={() => setActiveComponent("signup")}
                >
                  Sign Up
                </button>
              </div>
              <p className="text-white font-mono font-bold text-3xl cursor-pointer">
                Welcome
              </p>
            </div>
          </>
        )}

        <div className="w-full p-6">
          <div className="flex w-full justify-around mb-4">
            {activeComponent === "signup" && (
              <button
                className="px-2 py-1 rounded-full w-full hover:border border-rose-300  text-gray-800  hover:text-rose-200"
                onClick={() => setActiveComponent("signin")}
              >
                Login
              </button>
            )}
          </div>
          <div className="w-full mt-4">
            {activeComponent === "signup" && <Signup />}
            {activeComponent === "signin" && <Signin />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
