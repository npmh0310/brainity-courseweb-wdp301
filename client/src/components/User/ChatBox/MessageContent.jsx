import React from "react";

const MessageContent = ({ message }) => {
  return (
    <div
      className={`flex items-end ${
        message.type === "my" ? "justify-end" : "justify-start"
      } gap-x-2`}
    >
      {message.type === "their" && (
        <img
          src={message.imgSrc}
          className="w-9 h-9 rounded-full order-1"
          alt=""
        />
      )}
      <div
        className={`flex flex-col space-y-2 text-xs ${
          message.type === "their"
            ? "max-w-xs order-2 items-start"
            : "items-end"
        }`}
      >
        {message.type === "their" ? (
          <div>
            <span
              className={`px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600 text-left break-words`}
            >
              {message.text}
            </span>
          </div>
        ) : (
          <div className="w-2/3">
            <span
              className={`px-4 py-2 rounded-lg inline-block bg-gray-200 text-gray-600 text-left break-words`}
            >
              {message.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageContent;
