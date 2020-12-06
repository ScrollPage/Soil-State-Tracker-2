import styled from 'styled-components';

export const SChatWidgetBtn = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  background-color: ${({ theme }) => theme.blue};
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  &:hover {
    opacity: 0.8;
  }
`;
