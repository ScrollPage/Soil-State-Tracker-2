import styled, { css } from 'styled-components';

export const TextStep = styled.div`
  position: absolute;
  bottom: -158px;
  font-family: Raleway;
  font-style: normal;
  font-weight: 800;
  font-size: 200px;
  line-height: 235px;
  color: ${({ theme }) => theme.lightBlue};
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Main = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const Title = styled.div`
  align-self: flex-end;
  font-family: Rosalinda;
  font-style: normal;
  font-weight: normal;
  font-size: 70px;
  line-height: 140px;
  color: #000000;
`;
export const Subtitle = styled.div`
  align-self: flex-start;
  margin-bottom: 30px;
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 47px;
  color: #000000;
`;
export const Text = styled.div`
  margin: 0 40px 0 100px;
  text-align: left;
  font-family: Raleway;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 40px;
  color: #000000;
  z-index: 1;
`;
export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Box = styled.div`
  height: 200px;
  width: 345px;
  background: #C4C4C4;
`;

export const Wrapper = styled.div<{ isSecond: boolean }>`
  padding: 110px 0;
  ${({ isSecond, theme }) => isSecond && css`
    background-color: ${theme.lightBlue};
    ${Main} {
      flex-direction: row-reverse;
    }
    ${Subtitle} {
      align-self: flex-end;
    }
    ${Text} {
      margin: 0 100px 0 40px;
      text-align: right;
    }
    ${TextStep} {
      color: #fff;
      right: 0;
    }
  `}
`;