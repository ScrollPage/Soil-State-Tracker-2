import styled from "styled-components";

export const Strawberry = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;
  z-index: 2;
`

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.lightBlue};
  padding: 150px 0;
  ${Strawberry} {
    &:last-of-type {
      transform: scale(-1, 1);
      opacity: 0.65;
      z-index: 1;
      bottom: 80px;
      left: -40px;
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

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`
export const Main = styled.div`
  display: flex;
  flex-direction: column;
`

export const ImageWrapper = styled.div`
  position: relative;
  height: 483px;
  width: 398px;
`

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 86px;
`

export const Text = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 40px;
  margin-bottom: 20px;
`;