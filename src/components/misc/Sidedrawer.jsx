import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Avatar from "@mui/material/Avatar";
import { ChatState } from "../../context/chatprovider";
import Profilemodal from "./profilemodal";
import { useNavigate } from "react-router-dom";
import ChatLoading from "../chatloading";
import UserListItem from "../useravatar/userlistitem";
import { toast } from "react-toastify";
import axios from "axios";

const Sidedrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // For search drawer
  const [menuIsOpen, setMenuIsOpen] = useState(false); // For dropdown menu
  const [showProfileModal, setShowProfileModal] = useState(false); // For profile modal
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
    setMenuIsOpen(false); // Close the dropdown menu when opening the modal
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please enter something in search field", {
        autoClose: 3000,
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Error occurred! Failed to load the search", {
        autoClose: 3000,
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);
      console.log("Chat data:", data); // Debug log
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      console.error("Chat access error:", error); // Debug log
      toast.error("Error fetching the chats", { autoClose: 3000 });
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <div className="bg-white flex justify-between items-center">
      <div className="p-4">
        <button
          aria-label="Search"
          onClick={() => setIsOpen(true)} // For search drawer
        >
          <SearchIcon fontSize="small" />
          Search
        </button>
      </div>
      <h1 className="p-4 text-xl">Talkie</h1>
      <div className="p-4 relative">
        <button aria-label="Notifications">
          <NotificationsActiveIcon className="mr-1" />
        </button>
        <button
          onClick={toggleDropdown} // For dropdown menu
          aria-label="User menu"
        >
          <div className="flex bg-gray-200 rounded-xl px-3 py-1 items-center">
            <Avatar
              alt={user.name}
              src={user.pic}
              className="w-8 h-8 mr-1"
            />
            <ArrowDropDownOutlinedIcon className="text-xl rounded bg-gray-100 p-1" />
          </div>
        </button>
        {menuIsOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={openProfileModal}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          </div>
        )}
        <Profilemodal
          user={user}
          showModal={showProfileModal}
          setShowModal={closeProfileModal}
        />
      </div>
      <div
        className={`fixed inset-0 z-50 ${
          isOpen ? "flex" : "hidden"
        } bg-gray-600 bg-opacity-50 justify-center items-start`}
      >
        <div className="relative w-80 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">Search Users</h2>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search by name or email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                onClick={handleSearch}
              >
                Go
              </button>
            </div>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && (
              <div className="flex justify-center mt-4">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-6 w-6"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidedrawer;
