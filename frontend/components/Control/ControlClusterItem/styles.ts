import styled from 'styled-components';

export const SControlClusterItemTitle = styled.h2`
  text-align: center;
`

export const SControlClusterItemBody = styled.div`
  display: flex;
  flex-direction: column;
`

export const SControlClusterItem = styled.div<{ isOver: boolean, canDrop: boolean }>`
  background-color: ${({ canDrop, isOver }) => isOver ? "green" : canDrop ? "yellow" : "#fff"};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;


