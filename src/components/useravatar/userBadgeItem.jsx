import React from "react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <div
      className="inline-flex items-center px-2 py-1 m-1 mb-2 text-sm font-semibold text-white bg-purple-500 rounded-lg cursor-pointer"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <span className="ml-1 text-red-300">×</span>
    </div>
  );
};

export default UserBadgeItem;
