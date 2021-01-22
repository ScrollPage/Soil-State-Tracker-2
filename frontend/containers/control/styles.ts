import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 69px 80px 80px 80px;
  user-select: none;
  @media (max-width: 1199.98px) {
    padding: 0px 30px 80px 30px;
  }
  @media (max-width: 767.98px) {
    padding: 0px 0px 80px 0px;
  }
`;

export const Title = styled.h1`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  color: #000000;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  height: 100%;
  position: relative;
  min-height: 600px;
  @media (max-width: 1199.98px) {
    flex-direction: column;
  }
`;
