import React from "react";
import { SChatList } from "./styles";
import { IChat, INotify } from "@/types/chat";
import ChatListItem from "./ChatListItem";
import useSWR from "swr";
import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import EmptyMessage from "@/components/UI/EmptyMessage";

interface IChatList {
  chats: IChat[] | null;
}

const ChatList: React.FC<IChatList> = ({ chats }) => {
  const { data, error } = useSWR("/api/chat/", {
    initialData: chats,
  });

  console.log(data);

  if (error) return <ErrorMessage message="Ошибка загрузки чатов..." />;

  if (!data) return <LoadingSpinner />;

  if (data.length === 0)
    return <EmptyMessage message="У вас пока нет чатов..." />;

  return (
    <SChatList>
      {data.map((item, key) => {
        return (
          <ChatListItem
            key={`chat__key__${item.user_name}__${key}`}
            id={item.id}
            userName={item.user_name}
            isNotify={false}
            isRead={item.is_read}
          />
        );
      })}
    </SChatList>
  );
};

export default ChatList;
