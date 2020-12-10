import React from "react";
import { Wrapper, Content } from "./styles";

interface IEmptyMessage {
  message: string;
}

const EmptyMessage = ({ message }: IEmptyMessage) => (
  <Wrapper>
    <Content>{message}</Content>
  </Wrapper>
);

export default EmptyMessage;
