import React from "react";
import styled from "styled-components";

export const LoadingInner = () => {
  return (
    <Wrapper id="circleG">
      <div id="circleG_1" className="circleG"></div>
      <div id="circleG_2" className="circleG"></div>
      <div id="circleG_3" className="circleG"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-right: 16px;

  .circleG {
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
  }

  #circleG_1 {
    animation-delay: 0.45s;
  }

  #circleG_2 {
    animation-delay: 1.05s;
  }

  #circleG_3 {
    animation-delay: 1.35s;
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

  @-o-keyframes bounce_circleG {
    0% {
    }

    50% {
      background-color: rgb(0, 0, 0);
    }

    100% {
    }
  }

  @-ms-keyframes bounce_circleG {
    0% {
    }

    50% {
      background-color: rgb(0, 0, 0);
    }

    100% {
    }
  }

  @-webkit-keyframes bounce_circleG {
    0% {
    }

    50% {
      background-color: rgb(0, 0, 0);
    }

    100% {
    }
  }

  @-moz-keyframes bounce_circleG {
    0% {
    }

    50% {
      background-color: rgb(0, 0, 0);
    }

    100% {
    }
  }
`;
