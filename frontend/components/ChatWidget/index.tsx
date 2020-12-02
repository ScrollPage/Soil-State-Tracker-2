import React, { useState } from "react";
import { SChatWidgetBtn } from "./styles";
import ChatWidgetInner from "./ChatWidgetInner";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <ChatWidgetInner setIsOpen={setIsOpen} />
      ) : (
        <SChatWidgetBtn onClick={() => setIsOpen(true)}>
          Начать чат, мы онлайн!
        </SChatWidgetBtn>
      )}
    </>
  );
};

export default ChatWidget;
