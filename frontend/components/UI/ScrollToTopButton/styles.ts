import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 10;
  background-color: ${({ theme }) => theme.orange};
  border-radius: 20px;
  &:hover {
    opacity: 0.8;
  }
`;







