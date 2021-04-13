import styled from "styled-components";

export const Wrapper = styled.div`
  pointer-events: auto;
  position: fixed;
  top: 0;
  left: 0;
  height: 120px;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 60px;
  z-index: 10;
  background-color: ${({ theme }) => theme.blue};
`;

export const Content = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const Title = styled.h1`
  > a {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: normal;
    font-size: 40px;
    line-height: 50px;
    text-align: center;
    letter-spacing: 0.1em;
    color: #FFFFFF;
 }
`;

export const GoBack = styled.p`
  margin-bottom: 0px;
  @media (max-width: 991.98px) {
    display: none;
  }
  > a {
    font-family: "Play";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;
  }
`;
