import styled from "styled-components";

export const Header = styled.div`
  position: fixed;
  height: 120px;
  background-color: transparent;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 60px;
`;

export const Content = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-337px);
`;

export const Title = styled.h1`
  margin-left: 50px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 50px;
  text-align: center;
  letter-spacing: 0.1em;
  color: #FFFFFF;
`;

export const GoBack = styled.p`
  > a {
    font-family: "Play";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;
  }
`;

export const Main = styled.div`
  height: 100%;
  display: flex;
`;
