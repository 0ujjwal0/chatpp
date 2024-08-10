import React, { useState } from "react";
import { toast } from "react-toastify";
import { json, useNavigate} from "react-router-dom";
import axios from "axios";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show ,setShow]=useState(false);
  const [loading,setLoading]=useState(false);
  
  const navigate=useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.warning("Please fill in all fields",{autoClose:3000});
      setLoading(false);
      return;
    }
    try{
      const config={
        headers:{
          "content-type":"application/json",
        },
      };
      const{data}=await axios.post(
        "/api/user/login",
        {email,password},
        config
      );
      toast.success("login successful",{autoClose:3000});
      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    }catch(error){
      toast.error("error occured!!",{autoClose:3000});
      setLoading(false);
    }

    
  };

  return (
    <form
      className=" max-w-md mx-auto flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="signin_email"
          id="signin_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label
          htmlFor="signin_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="signin_password"
          id="signin_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label
          htmlFor="signin_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>
      <button
        type="submit"
        className=" text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        disabled={loading}
      >
        {loading ? "Loading..." : "Log In"}{" "}
      </button>
    </form>
  );
};

export default SignIn;
