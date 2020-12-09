import React from "react";
import { Content, Wrapper } from "./styles";

interface IErrorMessage {
  message: string;
}

const ErrorMessage = ({ message }: IErrorMessage) => (
  <Wrapper>
    <Content>{message}</Content>
  </Wrapper>
);

export default ErrorMessage;
