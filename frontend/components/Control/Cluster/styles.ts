import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div<{ isOver: boolean, canDrop: boolean, isChoose: boolean }>`
  background-color: ${({ canDrop, isOver }) => isOver ? "rgba(102, 255, 102, 0.2)" : canDrop ? "rgba(204, 255, 0, 0.2)" : "#fff"};
  color: ${({ theme, isChoose }) => isChoose ? theme.orange : '#000'};
  padding: 10px 0;
  width: 100%;
`;


