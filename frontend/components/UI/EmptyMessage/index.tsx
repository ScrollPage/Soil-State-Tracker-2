import React, { memo } from "react";
import { Wrapper, Content } from "./styles";

interface IEmptyMessage {
  message: string;
}

const EmptyMessageComponent = ({ message }: IEmptyMessage) => (
  <Wrapper>
    <Content>{message}</Content>
  </Wrapper>
);

export const EmptyMessage = memo(EmptyMessageComponent);
