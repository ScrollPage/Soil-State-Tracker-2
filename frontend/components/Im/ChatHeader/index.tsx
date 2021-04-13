import { Avatar } from "@/components/UI/Avatar";
import React, { memo, useContext, useState } from "react";
import { Wrapper, Hero, Name } from "./styles";
import deepEqual from "fast-deep-equal";
import { ImProps, ImContext } from "@/pages/im";
import useSWR from "swr";
import { useRouter } from "next/router";
import { getAsString } from "@/utils/getAsString";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { getFullName } from "@/utils/getFullName";

const ChatHeaderComponent = () => {
  const { currentChat } = useContext(ImContext) as ImProps;
  const { query } = useRouter();

  const chatId = getAsString(query.id);
  const [serverQuery] = useState(query);

  const { error, data } = useSWR(`/api/chat/${chatId}`, {
    initialData: deepEqual(query, serverQuery) ? currentChat : undefined,
  });

  if (error) {
    return (
      <Wrapper>
        <ErrorMessage message="Ошибка загрузки информации о пользователе" />
      </Wrapper>
    );
  }

  if (!data) {
    return <Wrapper />;
  } else {
    return (
      <Wrapper>
        <Hero>
          <Avatar />
          <Name>{getFullName(data.user)}</Name>
        </Hero>
      </Wrapper>
    );
  }
};

export const ChatHeader = memo(ChatHeaderComponent);
