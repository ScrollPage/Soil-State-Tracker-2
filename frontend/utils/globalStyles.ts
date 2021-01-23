import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    box-sizing: border-box;
  }
  html, body, #__next {
    height: 100% !important;
  }
  body {
    overflow-x: hidden;
    /* scroll-bar */
    &::-webkit-scrollbar {
        width: 5px;
        @media (max-width: 575.98px) {
            width: 0px;
        }
    }
    &::-webkit-scrollbar-track {
        height: 90%;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #60CFBF;
    }
  }
  #nprogress .bar {
    background: #60CFBF !important;
  }
  p {
    margin: 0;
  }
`;

export const globalTheme = {
  blue: "#2F3F53",
  lightBlue: "#F5F9FF",
  green: "#60CFBF",
  red: "#CF6060",
  yellow: "#CFBD60",
  white: "#FFF",
  orange: "#E86900",
  blueBgc: "#E5E5E5",
};