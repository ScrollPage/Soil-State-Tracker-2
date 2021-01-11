import React, { memo } from "react";
import { Content, Wrapper } from "./styles";

interface IErrorMessage {
  message: string;
}

const ErrorMessageComponent = ({ message }: IErrorMessage) => (
  <Wrapper>
    <Content>{message}</Content>
  </Wrapper>
);

export const ErrorMessage = memo(ErrorMessageComponent);
