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
      className="max-w-md mx-auto flex flex-col p-6 bg-transparent shadow-lg rounded-2xl"
      onSubmit={handleSubmit}
    >
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="signin_email"
          id="signin_email"
          className="block py-3 px-4 w-full text-md border-b-2 text-white bg-transparent  rounded-lg appearance-none focus:outline-none focus:ring-none focus:border-none peer"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label
          htmlFor="signin_email"
          className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          name="signin_password"
          id="signin_password"
          className="block py-3 px-4 w-full text-md border-b-2 text-white bg-transparent rounded-lg appearance-none focus:outline-none focus:ring-none focus:border-none peer "
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label
          htmlFor="signin_password"
          className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
        >
          Password
        </label>
      </div>

      <button
        type="submit"
        className="w-fullpx-2 py-1 rounded-full hover:border border-rose-300  hover:text-rose-200 text-gray-600 p-2"
        disabled={loading}
      >
        {loading ? "Loading..." : "Log In"}
      </button>
    </form>
  );
};

export default SignIn;
