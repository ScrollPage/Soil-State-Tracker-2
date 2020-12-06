import React, { useState } from "react";
import { SChatWidgetBtn } from "./styles";
import ChatWidgetInner from "./ChatWidgetInner";
import Image from "next/image";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <ChatWidgetInner setIsOpen={setIsOpen} />
      ) : (
        <SChatWidgetBtn onClick={() => setIsOpen(true)}>
          <Image src="/chat/open.svg" height={29} width={29} />
        </SChatWidgetBtn>
      )}
    </>
  );
};

export default ChatWidget;
