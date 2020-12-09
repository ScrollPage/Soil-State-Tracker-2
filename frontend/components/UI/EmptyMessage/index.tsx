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
  font-weight: 600;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;

const EmptyMessage = ({ message }: IEmptyMessage) => (
  <EmptyMessageContainer>
    <EmptyMessagePresenter>{message}</EmptyMessagePresenter>
  </EmptyMessageContainer>
);

export default EmptyMessage;
