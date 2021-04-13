import { Avatar } from "@/components/UI/Avatar";
import { IUser } from "@/types/user";
import { getAsString } from "@/utils/getAsString";
import { useRouter } from "next/router";
import React, { memo } from "react";
import { Wrapper, Hero, Name, Message } from "./styles";
import { getFullName } from "@/utils/getFullName";

interface Props {
  id: number;
  user: IUser;
  lastMessage?: string;
}

const DialogItemComponent: React.FC<Props> = ({ id, user, lastMessage }) => {
  const { push, query } = useRouter();
  const currentChatId = Number(getAsString(query.id));

  const handleChange = () => {
    if (currentChatId === id) {
      return;
    }
    push({ pathname: "/im", query: { id } }, undefined, {
      shallow: true,
    });
  };

  return (
    <Wrapper onClick={handleChange} isActive={currentChatId === id}>
      <Avatar size={43} />
      <Hero>
        <Name>{getFullName(user)}</Name>
        <Message>{lastMessage}</Message>
      </Hero>
    </Wrapper>
  );
};

export const DialogItem = memo(DialogItemComponent);
