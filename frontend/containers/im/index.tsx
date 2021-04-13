import { Chat } from "@/components/Im/Chat";
import { Dialogs } from "@/components/Im/Dialogs";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { getAsString } from "@/utils/getAsString";
import { useRouter } from "next/router";
import React from "react";
import { Wrapper, Side, Main } from "./styles";

interface ImContainerProps {}

export const ImContainer: React.FC<ImContainerProps> = ({}) => {
  const { query } = useRouter();
  const chatId = getAsString(query.id);

  return (
    <Wrapper>
      <Side>
        <Dialogs />
      </Side>
      <Main>
        {chatId ? <Chat /> : <EmptyMessage message="Выберите собесединика" />}
      </Main>
    </Wrapper>
  );
};
