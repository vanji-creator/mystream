import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { makeRandomMessage, randomNameGenerator } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((store) => store.chat.messages);
  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: randomNameGenerator(),
          message: makeRandomMessage(15) + "☀️",
        })
      );
    }, 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div>
      <div className="border border-black mx-4 rounded-lg w-96 h-[560px] p-2 overflow-y-scroll flex flex-col-reverse">
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} name={msg.name} message={msg.message} />
          ))}
      </div>
      <form
        className="w-full h-[20px]"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addMessage({ name: "Vanji Vikash", message: liveMessage }));
          setLiveMessage("");
        }}
      >
        <input
          type="text"
          className="w-3/4 mx-4 mt-2 rounded-lg border border-b-black px-2 h-8 outline-none"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
          placeholder="Say Something..."
        />
        <button className="bg-green-200 active:bg-green-700 w-16 rounded-lg h-8">
          Post
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
