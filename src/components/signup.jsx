import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [pic, setPic] = useState(null);
  const [picPreview, setPicPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmpass || !pic) {
      toast.warning("Please fill out all fields!", { autoClose: 3000 });
      setLoading(false);
      return;
    }

    if (password !== confirmpass) {
      toast.error("Passwords do not match", { autoClose: 3000 });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast.success("Registration Successful", { autoClose: 3000 });
      localStorage.setItem("userinfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast.error("An error occurred during registration", { autoClose: 3000 });
      setLoading(false);
    }
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast.warning("Please select an image!", { autoClose: 3000 });
      setLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "talkie");
      data.append("cloud_name", "ujjwal0");
      fetch("https://api.cloudinary.com/v1_1/ujjwal0/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicPreview(URL.createObjectURL(pics));
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Image upload failed", { autoClose: 3000 });
          setLoading(false);
        });
    } else {
      toast.warning("Please select a JPEG or PNG image!", { autoClose: 3000 });
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-md mx-auto flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_name"
          id="floating_name"
          className="block py-3 px-4 w-full text-md text-white bg-transparent  border-b-2 rounded-lg appearance-none focus:outline-none focus:ring-none focus:border-none peer"
          placeholder=" "
          value={name}
          onChange={(e) => setName(e.target.value)}
           
        />
        <label
          htmlFor="floating_name"
          className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="floating_email"
          id="floating_email"
          className="block py-3 px-4 w-full text-md text-white bg-transparent  border-b-2 rounded-lg appearance-none focus:outline-none focus:ring-none focus:border-none peer"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="floating_password"
          id="floating_password"
          className="block py-3 px-4 w-full text-md text-white bg-transparent  border-b-2 rounded-lg appearance-none focus:outline-none focus:ring-none focus:border-none peer"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="repeat_password"
          id="floating_repeat_password"
          className="block py-3 px-4 w-full text-md text-white bg-transparent  border-b-2 rounded-lg appearance-none focus:outline-none focus:ring-none focus:border-none peer"
          placeholder=" "
          value={confirmpass}
          onChange={(e) => setConfirmpass(e.target.value)}
           
        />
        <label
          htmlFor="floating_repeat_password"
          className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm password
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group my-8">
        <input
          type="file"
          name="profile_picture"
          id="profile_picture"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent rounded-lg border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={(e) => postDetails(e.target.files[0])}
          
        />
        <label
          htmlFor="profile_picture"
          className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Profile Picture
        </label>
        {picPreview && (
          <div className="mt-4">
            <img
              src={picPreview}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="px-2 py-1 rounded-full   hover:border border-rose-300  hover:text-rose-200 text-gray-800"
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;
