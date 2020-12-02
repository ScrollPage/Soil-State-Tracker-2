import styled from 'styled-components';

export const STextArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
`;

export const STextAreaTag = styled.textarea <{ isShowError?: boolean }> `
  border: 1.5px solid ${({ isShowError }) => isShowError ? 'red' : '#000'};
  padding: 6px 10px;
  font-size: 16px;
  width: 300px;
  border-radius: 2px;
  resize: vertical; 
  max-height: 160px;
  min-height: 100px;
`;

export const STextAreaError = styled.small`
  position: absolute;
  bottom: -20px;
  color: red;
`;