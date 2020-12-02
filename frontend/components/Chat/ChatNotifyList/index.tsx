import React from "react";
import { INotify } from "@/types/chat";
import useSWR from "swr";
import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { SChatList } from "../ChatList/styles";
import ChatListItem from "../ChatList/ChatListItem";

interface INotifyList {
  notifications: INotify[] | null;
}

const NotifyList: React.FC<INotifyList> = ({ notifications }) => {
  const { data, error } = useSWR("/api/notifications/", {
    initialData: notifications,
  });

  if (error) return <ErrorMessage message="Ошибка загрузки уведомлений..." />;

  if (!data) return <LoadingSpinner />;

  if (data.length === 0) return null;

  return (
    <SChatList>
      {data.map((item, key) => {
        return (
          <ChatListItem
            key={`notify__key__${item.user_name}__${key}`}
            id={item.chat}
            userName={item.user_name}
            isNotify={true}
          />
        );
      })}
    </SChatList>
  );
};

export default NotifyList;
