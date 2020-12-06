import styled from 'styled-components';

export const SControlClusterItemBody = styled.div`
  display: flex;
  flex-direction: column;
`

export const SControlClusterItem = styled.div<{ isOver: boolean, canDrop: boolean }>`
  background-color: ${({ canDrop, isOver }) => isOver ? "rgba(102, 255, 102, 0.2)" : canDrop ? "rgba(204, 255, 0, 0.2)" : "#fff"};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;


