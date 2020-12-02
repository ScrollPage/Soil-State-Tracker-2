import { createChat } from "@/store/actions/chat";
import { getMessages, getMessagesLoading } from "@/store/selectors";
import { IMessage } from "@/types/message";
import WebSocketInstance from "@/websocket";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "@/store/actions/message";
import { initialiseChat } from "@/utils.ts/initialiseChat";
import ChatInput from "@/components/Chat/ChatInput";
import ChatMessage from "@/components/Chat/ChatMessage";
import { getUser } from "@/utils.ts/getUser";
import {
  SChatWidget,
  SChatWidgetTop,
  SChatWidgetMessages,
  SChatWidgetClose,
} from "./styles";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useRef } from "react";

interface IChatWidgetInner {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ChatWidgetInner: React.FC<IChatWidgetInner> = ({ setIsOpen }) => {
  const dispatch = useDispatch();

  // const chatId = useSelector(getChatId);
  let messagesEnd = useRef<HTMLDivElement>();
  const messages = useSelector(getMessages);
  const loading = useSelector(getMessagesLoading);

  const [message, setMessage] = useState("");

  const [chatId, setChatId] = useState(() => Cookie.get("chatId") ?? "");

  const [isFirst, setIsFirst] = useState(false);

  const { fullName, isStaff } = getUser();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatId !== "") {
      dispatch(messageActions.setLoading());
      if (isFirst) {
        initialiseChat(chatId.toString(), () => {
          if (message.trim() !== "") {
            newChatMessageHandler();
          }
        });
      } else {
        initialiseChat(chatId);
      }
    }
    return () => {
      if (chatId !== "") {
        WebSocketInstance.disconnect();
      }
    };
  }, [chatId]);

  useEffect(() => {
    Cookie.set("chatId", chatId);
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
      isStaff: isStaff,
    };
    WebSocketInstance.newChatMessage(messageObject);
    setMessage("");
  };

  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "") {
      if (!chatId) {
        await dispatch(
          createChat((chatId: number) => {
            setIsFirst(true);
            setChatId(chatId.toString());
          })
        );
      } else {
        newChatMessageHandler();
      }
    }
  };

  const scrollToBottom = () => {
    // @ts-ignore: Unreachable code error
    messagesEnd.scrollIntoViewIfNeeded({ behavior: "smooth" });
  };

  return (
    <>
      <SChatWidget>
        <SChatWidgetClose onClick={() => setIsOpen(false)}>
          <CloseOutlined style={{ color: "#fff" }} />
        </SChatWidgetClose>
        <SChatWidgetTop>
          <h3>Напишите ваше сообщение</h3>
          <span>Операторы онлайн</span>
        </SChatWidgetTop>
        <SChatWidgetMessages>
          {!messages || loading ? (
            <p>Загрузка...</p>
          ) : messages.length === 0 ? (
            <p className="not-messages">У вас нет сообщений</p>
          ) : (
            renderChatMessages(messages)
          )}
          <div
            className="messages-end"
            // @ts-ignore: Unreachable code error
            ref={(el) => (messagesEnd = el)}
          />
        </SChatWidgetMessages>
        <ChatInput
          message={message}
          messageChange={messageChangeHandler}
          sendMessage={sendMessageHandler}
        />
      </SChatWidget>
    </>
  );
};

export default ChatWidgetInner;

const renderChatMessages = (data: IMessage[]) => {
  return data.map((item, index) => {
    return <ChatMessage key={`message__key__${index}`} message={item} />;
  });
};
