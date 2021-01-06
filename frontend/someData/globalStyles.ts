import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    text-decoration: none;
    box-sizing: border-box;
  }
  html {
    height: 100%;
    width: 100%;
  }
  #__next {
    height: 100%;
  }
  body {
    overscroll-behavior: none;
    overflow-x: hidden;
    &.no-scroll {
      overflow-y: hidden;
    }
    &::-webkit-scrollbar {
        width: 5px;
        background-color: #f5f5f5;
        @media (max-width: 575.98px) {
            width: 0px;
        }
    }
    &::-webkit-scrollbar-track {
        height: 90%;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #E86900;
    }
  }
  #nprogress .bar {
    background: #E86900 !important;
  }
  p {
    margin: 0;
  }

`;
