import { getAsString } from "@/utils/getAsString";
import { initialiseChat } from "@/utils/initialiseChat";
import { useRouter } from "next/router";
import React, { memo, useEffect } from "react";
// import { ChatHeader } from "../ChatHeader";
// import { ChatAdd } from "../../UI/ChatAdd";
import { Messages } from "../Messages";
import { messageActions } from "@/store/actions/message";
import { Wrapper } from "./styles";
import { useDispatch } from "react-redux";
import WebSocketInstance from "@/websocket";
import { useUser } from "@/hooks/useUser";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { userId } = useUser();
  const chatId = getAsString(query.id);

  useEffect(() => {
    if (chatId) {
      dispatch(messageActions.setLoading());
      initialiseChat(chatId);
      return () => {
        WebSocketInstance.disconnect();
      };
    }
  }, [chatId]);

  const sendMessageHandler = (content: string) => {
    if (content.trim() !== "") {
      const messageObject = {
        content,
        userId: userId,
      };
      WebSocketInstance.newChatMessage(messageObject);
    }
  };

  return (
    <Wrapper>
      {/* <ChatHeader /> */}
      <Messages />
      {/* <ChatAdd onSubmit={sendMessageHandler} /> */}
    </Wrapper>
  );
};

export const Chat = memo(ChatComponent);
