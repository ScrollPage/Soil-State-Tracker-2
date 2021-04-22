import { getAsString } from "@/utils/getAsString";
import { initialiseChat } from "@/utils/initialiseChat";
import { useRouter } from "next/router";
import React, { memo, useEffect } from "react";
import { ChatHeader } from "../ChatHeader";
import { Messages } from "../Messages";
import { messageActions } from "@/store/actions/message";
import { Wrapper } from "./styles";
import { useDispatch } from "react-redux";
import WebSocketInstance from "@/websocket";
import { useUser } from "@/hooks/useUser";
import { ChatAdd } from "../ChatInput";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { token } = useUser();
  const chatId = getAsString(query.id);

  useEffect(() => {
    if (chatId) {
      dispatch(messageActions.setLoading());
      initialiseChat(chatId, token);
      return () => {
        WebSocketInstance.disconnect();
      };
    }
  }, [chatId]);

  const sendMessage = (content: string) => {
    const messageObject = {
      content,
      token,
    };
    WebSocketInstance.newChatMessage(messageObject);
  };

  return (
    <Wrapper>
      <ChatHeader />
      <Messages />
      <ChatAdd handleSubmit={sendMessage} />
    </Wrapper>
  );
};

export const Chat = memo(ChatComponent);
