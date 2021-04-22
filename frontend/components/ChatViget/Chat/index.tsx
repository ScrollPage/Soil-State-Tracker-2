import React, { useEffect, useState } from "react";
import { ChatAdd } from "@/components/Im/ChatInput";
import { Wrapper } from "./styles";
import { ChatHeader } from "../ChatHeader";
import WebSocketInstance from "@/websocket";
import { useUser } from "@/hooks/useUser";
import { useDispatch } from "react-redux";
import { initialiseChat } from "@/utils/initialiseChat";
import { createChat } from "@/store/actions/chat";
import Cookie from "js-cookie";
import { Messages } from "@/components/Im/Messages";

interface Props {
  onClose: () => void;
}

export const Chat: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [chatId, setChatId] = useState<string | undefined>(Cookie.get("chat"));
  const { token, userId } = useUser();

  useEffect(() => {
    if (chatId) {
      Cookie.set("chat", chatId);
      // initialiseChat(chatId, token);
      initialiseChat(chatId, userId);
      return () => {
        WebSocketInstance.disconnect();
      };
    }
  }, [chatId]);

  const sendMessage = async (content: string) => {
    if (!chatId) {
      await dispatch(createChat(setChatId));
    }
    const messageObject = {
      content,
      token: userId,
    };
    WebSocketInstance.newChatMessage(messageObject);
  };

  return (
    <Wrapper>
      <ChatHeader onClose={onClose} chatId={chatId} />
      <div style={{ height: "390px" }}>
        <Messages />
      </div>
      <ChatAdd handleSubmit={sendMessage} />
    </Wrapper>
  );
};
