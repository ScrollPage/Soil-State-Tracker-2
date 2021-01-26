import styled from 'styled-components';

export const STextArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
`;

export const STextAreaTag = styled.textarea <{ isShowError?: boolean }> `
  border: 1.5px solid ${({ isShowError }) => isShowError ? 'red' : "transparent"};
  font-size: 18px;
  width: 100%;
  resize: vertical; 
  max-height: 240px;
  min-height: 160px;
  border-radius: 20px;
  outline: none;
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
`;

export const STextAreaError = styled.small`
  position: absolute;
  bottom: -20px;
  color: red;
`;