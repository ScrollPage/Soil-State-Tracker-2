import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { useUser } from "@/hooks/useUser";
import { getMessageInfo } from "@/store/selectors";
import { IMessage } from "@/types/message";
import React, { memo, useEffect, useMemo, useRef, RefObject } from "react";
import { useSelector } from "react-redux";
import { MessageItem } from "../MessageItem";
import { Wrapper, MessagesEnd, LoadingWrapper } from "./styles";

const renderMessages = (messages: IMessage[], userId: number) => {
  return messages.map((message) => {
    return (
      <MessageItem
        key={`messageItem__key__${message.id}`}
        content={message.content}
        timestamp={message.timestamp}
        fullName={message.user.full_name}
        active={userId === message.user.id}
      />
    );
  });
};

const MessagesComponent = () => {
  const { userId } = useUser();

  const { messages, loading } = useSelector(getMessageInfo);
  let endRef = useRef() as RefObject<HTMLDivElement>;

  const isLoading = useMemo(() => !messages || loading, [messages, loading]);

  const scrollToBottom = () => {
    endRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, loading]);

  return (
    <Wrapper>
      {isLoading ? (
        <LoadingWrapper>
          <LoadingSpinner />
        </LoadingWrapper>
      ) : messages.length === 0 ? (
        <EmptyMessage message="У вас пока нет сообщений..." />
      ) : (
        renderMessages(messages, Number(userId))
      )}
      <MessagesEnd ref={endRef} />
    </Wrapper>
  );
};

export const Messages = memo(MessagesComponent);
