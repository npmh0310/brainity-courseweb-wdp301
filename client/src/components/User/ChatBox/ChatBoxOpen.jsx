import React, { useState } from "react";
import Logo from "../../../assets/images/logo_noBg.png";
import { SendHorizontal, Paperclip, X } from "lucide-react";
import MessageContent from "./MessageContent";

const ChatBoxOpen = ({ handleCloseBox }) => {
  const [haveMessage, setHaveMessage] = useState(true);
  const messages = [
    {
      type: "their",
      text: "Xin chào! Bạn khỏe không? Mình có một số câu hỏi về sản phẩm của bạn.",
      imgSrc: Logo, // Thay bằng đường dẫn thực tế nếu khác
    },
    {
      type: "my",
      text: "Chào bạn! Mình khỏe, cảm ơn bạn đã hỏi. Bạn cần hỏi về điều gì?",
    },
    {
      type: "their",
      text: "Mình muốn biết thêm về tính năng mới của sản phẩm. Bạn có thể giải thích chi tiết hơn không?",
      imgSrc: Logo, // Thay bằng đường dẫn thực tế nếu khác
    },
    {
      type: "my",
      text: "Chắc chắn rồi! Tính năng mới cho phép bạn tùy chỉnh giao diện người dùng một cách dễ dàng hơn và tích hợp với nhiều dịch vụ khác nhau.",
    },
    {
      type: "their",
      text: "Nghe thú vị đấy! Vậy còn về giá cả thì sao? Có thay đổi gì không?",
      imgSrc: Logo, // Thay bằng đường dẫn thực tế nếu khác
    },
    {
      type: "my",
      text: "Giá cả vẫn giữ nguyên, nhưng chúng tôi có thêm một số gói dịch vụ mới để bạn lựa chọn phù hợp với nhu cầu của mình.",
    },
    {
      type: "their",
      text: "Cảm ơn bạn rất nhiều! Mình sẽ xem xét các gói dịch vụ mới này.",
      imgSrc: Logo, // Thay bằng đường dẫn thực tế nếu khác
    },
  ];

  return (
    <div className="fixed bottom-7 right-6 w-[340px] h-[470px] rounded-2xl bg-white shadow-lg flex flex-col">
      <header className="flex flex-row bg-slate-100 px-5 rounded-t-2xl py-3 border-b border-gray-300 relative">
        <div className="flex flex-row gap-x-4 items-center w-5/6">
          <div className="w-2/6">
            <img src={Logo} className="mt-0" alt="Logo" />
          </div>
          <div className="w-4/6">
            <h1 className="text-2xl font-bold text-primary mb-1">Brainity</h1>
            <p className="text-xs">Message us for more details</p>
          </div>
        </div>

        <button
          className=" absolute top-3 right-3 p-1 rounded-full hover:bg-slate-200 flex justify-end cursor-pointer text-i"
          onClick={handleCloseBox}
        >
          <X size={20} />
        </button>
      </header>

      {haveMessage ? (
        <div className="flex-grow text-center flex flex-col border-b border-gray-200">
          <div className="h-[310px] overflow-y-auto  flex flex-col-reverse  scrollbar-custom ">
            <div className=" flex flex-col px-3 py-5 space-y-4">
              {messages.map((message, index) => (
                <MessageContent key={index} message={message} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow text-center flex items-center justify-center flex-col border-b border-gray-200">
          <img src={Logo} className="w-32" alt="Logo" />
          <h1 className="text-sm">Send a message to start a conversation!</h1>
        </div>
      )}

      <form className="flex items-center px-4 gap-x-2 h-14">
        <label
          htmlFor="file-upload"
          className="flex justify-center items-center hover:text-primary cursor-pointer"
        >
          <Paperclip size={20} />
        </label>
        <input id="file-upload" type="file" className="hidden" />
        <input
          className="w-full px-3 border-none outline-none text-sm "
          type="text"
          placeholder="Ask a question..."
        />
        <button className="flex justify-center items-center  hover:text-primary cursor-pointer ">
          <SendHorizontal className=" " size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatBoxOpen;
