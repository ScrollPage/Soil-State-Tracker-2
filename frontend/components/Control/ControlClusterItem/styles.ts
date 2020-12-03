import styled from 'styled-components';

export const SControlClusterItemTitle = styled.h2`
  text-align: center;
`

export const SControlClusterItemBody = styled.div`
  display: flex;
  flex-direction: column;
`

export const SControlClusterItem = styled.div<{ isOver: boolean, canDrop: boolean }>`
  opacity: ${({ isOver }) => isOver ? 0.5 : 1};
  background-color: ${({ canDrop }) => canDrop ? "green" : "#fff"};
  padding: 10px;
`;


