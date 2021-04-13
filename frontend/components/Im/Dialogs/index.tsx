import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ImProps, ImContext } from "@/pages/im";
import { IChat } from "@/types/chat";
import React, { memo, useContext, useMemo } from "react";
import useSWR from "swr";
import { DialogItem } from "../DialogItem";
import { Wrapper } from "./styles";

export const renderDialogs = (chats: IChat[]) => {
  return chats.map((chat) => {
    return (
      <DialogItem
        key={`dialogItem__key__${chat.id}`}
        id={chat.id}
        user={chat.user}
        lastMessage={chat?.last_message?.content}
        isFree={!chat?.admin}
      />
    );
  });
};

const DialogsComponent = () => {
  const { chats, freeChats } = useContext(ImContext) as ImProps;

  const { error: chatsError, data: chatsData } = useSWR("/api/client/chat/", {
    initialData: chats,
  });

  const { error: freeChatsError, data: freeChatsData } = useSWR(
    "/api/chat/free/",
    {
      initialData: freeChats,
    }
  );

  const newData = useMemo(() => {
    if (chatsData && freeChatsData) {
      return [...freeChatsData, ...chatsData];
    }
    return [];
  }, [chatsData, freeChatsData]);

  return (
    <Wrapper>
      {chatsError || freeChatsError ? (
        <ErrorMessage message="Ошибка загрузки диалогов" />
      ) : !newData ? (
        <LoadingSpinner />
      ) : newData.length === 0 ? (
        <EmptyMessage message="Нет диалогов" />
      ) : (
        renderDialogs(newData)
      )}
    </Wrapper>
  );
};

export const Dialogs = memo(DialogsComponent);
