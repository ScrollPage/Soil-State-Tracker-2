import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ width?: string }>`
  width: ${({ width }) => width ? width : '100%'};
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Inner = styled.input <{ isShowError?: boolean, myType?: "default" }>`
  border: 1.5px solid ${({ isShowError }) => isShowError ? 'red' : "transparent"};
  width: 100%;
  padding: 11px 50px;
  background-color: rgba(196, 196, 196, 0.3);
  backdrop-filter: blur(4px);
  font-family: "Play";
  color: #fff;
  font-size: 18px;
  border-radius: 10px;
  outline: none;
  ::placeholder {
    color: ${({ theme }) => theme.white};
    font-size: 14px;
  }  

  ${({ myType }) => myType === 'default' && css`
    padding: 20px 35px;
    color: rgba(0, 0, 0, 0.7);
    background-color: #fff;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
    ::placeholder {
      color: #000;
      font-size: 18px;
      font-family: Play;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 16px;
      color: rgba(0, 0, 0, 0.4);
    }  
  `}
`;

export const Error = styled.small`
  font-family: "Play";
  position: absolute;
  bottom: -20px;
  color: ${({ theme }) => theme.red};
`;

export const Icon = styled.small`
  position: absolute;
  z-index: 1;
  top: 11px;
  left: 19px;
`;

