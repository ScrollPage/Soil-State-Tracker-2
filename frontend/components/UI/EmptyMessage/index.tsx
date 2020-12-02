import styled from "styled-components";
import React from "react";

interface IEmptyMessage {
  message: string;
}

const EmptyMessageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const EmptyMessagePresenter = styled.div`
  display: inline-block;
  margin: 20px auto;
  font-weight: 600;
`;

const EmptyMessage = ({ message }: IEmptyMessage) => (
  <EmptyMessageContainer>
    <EmptyMessagePresenter>{message}</EmptyMessagePresenter>
  </EmptyMessageContainer>
);

export default EmptyMessage;
