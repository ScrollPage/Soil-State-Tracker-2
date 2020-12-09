import styled from "styled-components";

export const Wrapper = styled.div`
  height: 776px;
  background-color: ${({ theme }) => theme.lightBlue};
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

export const Strawberry = styled.div`
  position: absolute;
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