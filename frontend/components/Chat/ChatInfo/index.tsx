import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { readChat } from "@/store/actions/chat";
import { IChat } from "@/types/chat";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { SChatInfo } from "./styles";

interface IChatInfo {
  chatId?: string;
}

const ChatInfo: React.FC<IChatInfo> = ({ chatId }) => {
  const dispatch = useDispatch();

  // const { data, error } = useSWR<IChat>(`/api/chat/${chatId}/`);

  // Добавить условие
  // useEffect(() => {
  //   if (!chatId) return;
  //   dispatch(readChat(Number(chatId)));
  // }, [chatId]);

  // if (error)
  //   return <ErrorMessage message="Ошибка загрузки информации о чате..." />;

  // if (!data) return <LoadingSpinner />;

  return <SChatInfo>{/* <h3>{data.user_name}</h3> */}</SChatInfo>;
};

export default ChatInfo;
