import React, { memo } from "react";
import { Content } from "./styles";

interface IErrorMessage {
  message: string;
}

const ErrorMessageComponent = ({ message }: IErrorMessage) => (
  <Content>{message}</Content>
);

export const ErrorMessage = memo(ErrorMessageComponent);
