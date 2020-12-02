import { IMessage } from "@/types/message";
import React, { useRef, useEffect } from "react";
import ChatMessage from "../ChatMessage";
import { SChatInner } from "./styles";
import scrollIntoViewIfNeeded from "scroll-into-view-if-needed";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import EmptyMessage from "@/components/UI/EmptyMessage";
import { useSelector } from "react-redux";
import { getMessages, getMessagesLoading } from "@/store/selectors";

const renderChatMessages = (data: IMessage[]) => {
  return data.map((item, index) => {
    return <ChatMessage key={`message__key__${index}`} message={item} />;
  });
};

const ChatInner: React.FC<{}> = ({}) => {
  const messages = useSelector(getMessages);
  const loading = useSelector(getMessagesLoading);

  let messagesEnd = useRef<HTMLDivElement>();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    // @ts-ignore: Unreachable code error
    messagesEnd?.scrollIntoViewIfNeeded({ behavior: "smooth" });
  };

  const isLoading = !messages || loading;

  return (
    <SChatInner>
      {isLoading ? (
        <LoadingSpinner />
      ) : messages.length === 0 ? (
        <EmptyMessage message="У вас пока нет сообщений..." />
      ) : (
        renderChatMessages(messages)
      )}
      <div
        className="messages-end"
        // @ts-ignore: Unreachable code error
        ref={(el) => (messagesEnd = el)}
      />
    </SChatInner>
  );
};

export default ChatInner;
