import styled from 'styled-components';

export const Wrapper = styled.div`
  ${Container} {
    pointer-events: none;
  }
  background-color: #000;
  #tsparticles {
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  flex: 1;
  padding: 328px 0 110px 0;
`;

export const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-family: "Play";
  font-weight: normal;
  font-size: 48px;
  line-height: 56px;
  color: ${({ theme }) => theme.white};
  margin-bottom: 84px;
`;
export const SubTitle = styled.span`
  margin-top: 20px;
  font-family: "Play";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
`;

export const Bottom = styled.span`
  z-index: 10;
  pointer-events: auto;
  margin-top: 10px;
  > a {
    font-family: "Play";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #4753bb;
  }
`;
