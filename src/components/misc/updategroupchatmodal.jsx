import React, { useState } from "react";
import { ChatState } from "../../context/chatprovider";
import { getSender,getSenderFull } from "../../config/chatlogics";
import UserBadgeItem from "../useravatar/userBadgeItem";
import UserListItem from "../useravatar/userlistitem";
import axios from "axios";
import { toast } from "react-toastify"; // Using react-toastify for toasts

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

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
      toast.error("Failed to Load the Search Results");
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast.error("User Already in group!");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast.error("Only admins can add someone!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast.error("Only admins can remove someone!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat(null) : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={onOpen}
        className="flex items-center"
      >
        View
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" >
          <div className="relative flex flex-col items-center bg-gradient-to-br from-slate-200 to-violet-100 p-6 rounded-lg shadow-lg" >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-xl text-gray-500 hover:bg-red-500 hover:text-white w-6"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-violet-900">
              {selectedChat.chatName.toUpperCase()}
            </h2>
            <div className="w-full flex flex-wrap mb-4">
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </div>
            <div className="w-full flex mb-4">
              <input
                type="text"
                placeholder="Chat Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
                className="flex-grow px-4 py-2 rounded-l-md border-b-2 border-violet-500 focus:outline-none text-gray-600"
              />
              <button
                onClick={handleRename}
                className="px-4 py-2 bg-white hover:bg-violet-400 hover:text-violet-50 text-violet-600 rounded-r-md border-b-2 border-violet-500"
                disabled={renameloading}
              >
                {renameloading ? "Updating..." : "Update"}
              </button>
            </div>
            <input
              type="text"
              placeholder="Add User to group"
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 mb-4  rounded-md focus:outline-none text-gray-600 border-b-2 border-violet-500"
            />
            {loading ? (
              <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full" />
            ) : (
              searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
            <button
              onClick={() => handleRemove(user)}
              className="mt-4 px-4 py-2 border border-red-500 text-red-600 hover:bg-red-500 hover:text-white rounded-md"
            >
              Leave Group
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateGroupChatModal;
