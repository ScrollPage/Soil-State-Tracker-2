import { renderTimestamp } from "@/utils/renderTimestamp";
import React, { memo } from "react";
import { Wrapper, Text, Title, Header, Time } from "./styles";

interface MessageItemProps {
  content: string;
  timestamp: string;
  fullName: string;
  active: boolean;
}

const MessageItemComponent: React.FC<MessageItemProps> = ({
  fullName,
  content,
  timestamp,
  active,
}) => {
  return (
    <Wrapper isActive={active}>
      <Header>
        <Title>{fullName}</Title>
        <Time>{renderTimestamp(timestamp)}</Time>
      </Header>
      <Text>{content}</Text>
    </Wrapper>
  );
};

export const MessageItem = memo(MessageItemComponent);
