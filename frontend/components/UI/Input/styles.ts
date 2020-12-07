import styled from 'styled-components';

export const SInput = styled.div<{ width?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 350px;
`;

export const SInputTag = styled.input <{ isShowError?: boolean, width?: string }> `
  border: 1.5px solid ${({ isShowError }) => isShowError ? 'red' : "rgba(196, 196, 196, 0.3)"};
  padding: 20px 50px;
  background-color: rgba(196, 196, 196, 0.3);
  backdrop-filter: blur(4px);
  font-family: "Play";
  color: #fff;
  font-size: 18px;
  border-radius: 20px;
  outline: none;
  ::placeholder {
    color: ${({ theme }) => theme.white};
    font-size: 18px;
  }  
`;

export const SInputError = styled.small`
  font-family: "Play";
  position: absolute;
  bottom: -20px;
  color: ${({ theme }) => theme.red};
`;

export const SInputImg = styled.small`
  position: absolute;
  z-index: 1;
  top: 23px;
  left: 19px;
`;

