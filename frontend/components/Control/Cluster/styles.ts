import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div<{ isOver: boolean, canDrop: boolean, isMain: boolean, isChoose: boolean }>`
  background-color: ${({ canDrop, isOver, theme, isMain }) => isOver ? "rgba(102, 255, 102, 0.2)" : canDrop ? "rgba(204, 255, 0, 0.2)" : isMain ? "#fff" : theme.lightBlue};
  border: 1px solid ${({ theme, isChoose }) => isChoose ? theme.orange : 'transparent'};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 28px;
  padding: 23px;
  width: 100%;
`;


