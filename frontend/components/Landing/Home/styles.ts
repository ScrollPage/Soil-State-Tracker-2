import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  background: url(login/login_bgc.png) repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
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

export const Strawberry = styled.div`
  position: absolute;
  right: -170px;
  bottom: -200px;
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
