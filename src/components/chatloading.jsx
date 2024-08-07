import React from "react";

const ChatLoading = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="h-12 bg-gray-200 rounded animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default ChatLoading;
