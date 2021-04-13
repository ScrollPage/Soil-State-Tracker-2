import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ImProps, ImContext } from "@/pages/im";
import { IChat } from "@/types/chat";
import React, { memo, useContext } from "react";
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
      />
    );
  });
};

const DialogsComponent = () => {
  const { chats } = useContext(ImContext) as ImProps;

  const { error, data } = useSWR("/api/client/chat/", {
    initialData: chats,
  });

  return (
    <Wrapper>
      {error ? (
        <ErrorMessage message="Ошибка загрузки диалогов" />
      ) : !data ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyMessage message="Нет диалогов" />
      ) : (
        renderDialogs(data)
      )}
    </Wrapper>
  );
};

export const Dialogs = memo(DialogsComponent);
