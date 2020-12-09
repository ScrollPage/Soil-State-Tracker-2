import styled from "styled-components";

export const Strawberry = styled.div`
  position: absolute;
  bottom: -100px;
  right: 122px;
  z-index: 2;
`;

export const Wrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.lightBlue};
  position: relative;
  padding: 209px 0 269px 0;
  ${Strawberry} {
    &:last-of-type {
      opacity: 0.65;
      z-index: 1;
      bottom: -30px;
      right: 142px;
      transform: scale(-1, 1)
    }
  }
`;

export const Title = styled.div`
  font-family: "Rosalinda";
  font-style: normal;
  font-weight: normal;
  font-size: 70px;
  line-height: 140px;
  color: #000000;
`;

export const Text = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 40px;
  width: 60%;
  align-self: flex-end;
  text-indent: 40px;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const MyImage = styled.div`
  position: absolute;
  bottom: -140px;
  left: -90px;
  z-index: 1;
`;
