import styled from 'styled-components';

export const SInput = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
`;

export const SInputTag = styled.input <{ isShowError?: boolean, width?: string }> `
  border: 1.5px solid ${({ isShowError }) => isShowError ? 'red' : '#000'};
  width: ${({ width }) => width ? width : '300px'};
  padding: 6px 10px;
  font-size: 16px;
  border-radius: 2px;
`;

export const SInputError = styled.small`
  position: absolute;
  bottom: -20px;
  color: red;
`;