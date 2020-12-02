import styled from "styled-components";
import React from "react";

interface IErrorMessage {
  message: string;
}

const ErrorMessageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorMessagePresenter = styled.div`
  display: inline-block;
  margin: 20px auto;
  padding: 8px 15px;
  border-radius: 4px;
  color: #f02d2d;
  font-weight: 600;
  background: rgba(240, 45, 45, 0.1);
`;

const ErrorMessage = ({ message }: IErrorMessage) => (
  <ErrorMessageContainer>
    <ErrorMessagePresenter>{message}</ErrorMessagePresenter>
  </ErrorMessageContainer>
);

export default ErrorMessage;
