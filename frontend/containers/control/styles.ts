import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  margin: 70px 0;
  color: #000000;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  position: relative;
  min-height: 600px;
  @media (max-width: 1199.98px) {
    flex-direction: column;
  }
`;
