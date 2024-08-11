import React from "react";
import { ChatState } from "../../context/chatprovider";

const UserListItem = ({ user,handleFunction,set }) => {

  return (
    <div
      onClick={handleFunction}
      className="flex items-center hover:border-b-2 hover:border-violet-400 bg-gray-200 hover:bg-violet-100 hover:text-white w-full px-3 py-2 mb-4 rounded-lg cursor-pointer"
    >
      <img
        className="mr-2 w-8 h-8 rounded-full"
        src={user.pic}
        alt={user.name}
      />
      <div onClick={()=>set}>
        <p className="text-black">{user.name}</p>
        <p className="text-xs text-gray-600">
          <strong>Email : </strong>
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;
