import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ChatInfo from "./ChatInfo";
import ChatInner from "./ChatInner";
import ChatInput from "./ChatInput";
import {
  SChat,
  SChatLeft,
  SChatRight,
  SChatSearch,
  SChatLeftInner,
} from "./styles";
import { messageActions } from "@/store/actions/message";
import WebSocketInstance from "@/websocket";
import { IChat, INotify } from "@/types/chat";
import { initialiseChat } from "@/utils.ts/initialiseChat";
import { getUser } from "@/utils.ts/getUser";
import { getAsString } from "@/utils.ts/getAsString";
import ChatList from "./ChatList";
import NotifyList from "./ChatNotifyList";

interface IChatProps {
  chats: IChat[] | null;
  notifications: INotify[] | null;
}

const Chat: React.FC<IChatProps> = ({ chats, notifications }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState<string | undefined>(undefined);
  const { fullName, isStaff } = getUser();
  const { query } = useRouter();

  useEffect(() => {
    setChatId(getAsString(query.id));
  }, [query]);

  useEffect(() => {
    if (chatId) {
      dispatch(messageActions.setLoading());
      initialiseChat(chatId);
      return () => {
        WebSocketInstance.disconnect();
      };
    }
  }, [chatId]);

  const messageChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMessage(e.target.value);
  };

  const newChatMessageHandler = () => {
    const messageObject = {
      chatId: chatId,
      content: message,
      fullName: fullName,
      isRead: isStaff,
    };
    WebSocketInstance.newChatMessage(messageObject);
    setMessage("");
  };

  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "") {
      newChatMessageHandler();
    }
  };

  return (
    <SChat>
      <SChatLeft>
        <SChatSearch>Поиск</SChatSearch>
        <SChatLeftInner>
          <NotifyList notifications={notifications} />
          <ChatList chats={chats} />
        </SChatLeftInner>
      </SChatLeft>
      <SChatRight>
        {chatId && chats && (
          <>
            <ChatInfo chatId={chatId} />
            <ChatInner />
            <ChatInput
              sendMessage={sendMessageHandler}
              messageChange={messageChangeHandler}
              message={message}
            />
          </>
        )}
      </SChatRight>
    </SChat>
  );
};

export default Chat;
