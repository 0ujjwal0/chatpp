import React, { useState } from "react";
import { toast } from "react-toastify";
import { ChatState } from "../../context/chatprovider";
import axios from "axios";
import UserListItem from "../useravatar/userlistitem";

const GroupChatModal = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { user, chats, setChats } = ChatState();

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleDelete = (userToDelete) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user._id !== userToDelete._id)
    );
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.error("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async(query) => {
    setSearch(query);
    if(!query){
        return;
    }
    try{
        setLoading(true);
        const config={
            headers:{
Authorization: `Bearer ${user.token}`,
            },
        };
        const {data}=await axios.get(`/api/user?search=${search}`,config)
        console.log(data);
        setLoading(false);
        setSearchResult(data);
    }catch(error){
        toast.error("failed to load the search results",{autoClose:3000})
    }
  };
   
  const handleSubmit = async () => {
     if (!groupChatName || !selectedUsers) {
       toast.error("please fill all the details",{autoClose:3000})
       return;
     }

     try {
       const config = {
         headers: {
           Authorization: `Bearer ${user.token}`,
         },
       };
       const { data } = await axios.post(
         `/api/chat/group`,
         {
           name: groupChatName,
           users: JSON.stringify(selectedUsers.map((u) => u._id)),
         },
         config
       );
       setChats([data, ...chats]);
       onClose();
       toast.success("new group created",{autoClose:3000});
     } catch (error) {
       toast.error("failed to create new group ", { autoClose: 3000 });
     }
   };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-50">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Create Group Chat</h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col items-center mt-4">
              <input
                type="text"
                placeholder="Chat Name"
                className="w-full p-2 mb-3 border rounded-lg"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Add Users eg: ujjwal,jai,rahul"
                className="w-full p-2 mb-3 border rounded-lg"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="w-full flex flex-wrap mb-3">
                {selectedUsers.map((u) => (
                  <div
                    key={u._id}
                    className="bg-gray-200 rounded-lg p-2 m-1"
                  >
                    {u.name}
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => handleDelete(u)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              {loading ? (
                <div>Loading...</div>
              ) : (
                searchResult.slice(0, 4).map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                Create Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChatModal;
