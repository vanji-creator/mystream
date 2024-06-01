import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex  pt-2">
      <img
        className="h-6"
        alt="user"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
      />
      <span className="font-bold ml-1 mr-3">{name}</span>
      <span>{message}</span>
    </div>
  );
};

export default ChatMessage;
