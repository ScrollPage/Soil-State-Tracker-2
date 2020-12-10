import Container from "@/components/UI/Container";
import styled from "styled-components";

export const Strawberry = styled.div`
  position: absolute;
  right: -170px;
  bottom: -200px;
  z-index: 2;
`

export const StrawberryBgc = styled.div`
  position: absolute;
  right: -100px;
  bottom: -320px;
  z-index: 1;
`

export const Wrapper = styled.div`
  ${Container} {
    pointer-events: none;
  }
  #tsparticles {
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  height: 100vh;
  background-color: #000;
  position: relative;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`
export const Title = styled.div`
  font-family: Rosalinda;
  font-style: normal;
  font-weight: normal;
  font-size: 80px;
  line-height: 160px;
  color: #FFFFFF;
  margin-bottom: 17px;
`

export const Subtitle = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  color: #FFFFFF;
  margin-bottom: 35px;
`


