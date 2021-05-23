import React from "react";
import styled from "styled-components";

export const LoadingInner = () => {
  return (
    <Wrapper>
      <div></div>
      <div></div>
      <div></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-right: 16px;

  > div {
    background-color: rgb(255, 255, 255);
    float: left;
    height: 12px;
    margin-left: 17px;
    width: 12px;
    animation-name: bounce_circleG;
    animation-duration: 2.24s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    border-radius: 20px;
    &:nth-child(1) {
      animation-delay: 0.45s;
    }
    &:nth-child(2) {
      animation-delay: 1.05s;
    }
    &:nth-child(3) {
      animation-delay: 1.35s;
    }
  }

  @keyframes bounce_circleG {
    0% {
    }

    50% {
      background-color: rgb(0, 0, 0);
    }

    100% {
    }
  }
`;
