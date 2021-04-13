import { Avatar } from "@/components/UI/Avatar";
import React from "react";
import { Wrapper, Hero, Name, Close } from "./styles";
import useSWR from "swr";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { getFullName } from "@/utils/getFullName";

interface Props {
  onClose: () => void;
  chatId?: string;
}

export const ChatHeader: React.FC<Props> = ({ chatId, onClose }) => {
  const render = (name: string) => {
    return (
      <Wrapper>
        <Close onClick={onClose} />
        <Hero>
          <Avatar />
          <Name>{name}</Name>
        </Hero>
      </Wrapper>
    );
  };

  if (chatId) {
    const { error, data } = useSWR(`/api/chat/${chatId}`);

    if (error) {
      return render("Идет поиск");
    }

    if (!data) {
      return <Wrapper />;
    }

    return render(getFullName(data.user));
  }

  return render("Напишите нам");
};
