import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 100px;
`

export const Wrapper = styled.div<{ isOver: boolean, canDrop: boolean, isMain: boolean }>`
  background-color: ${({ canDrop, isOver, theme, isMain }) => isOver ? "rgba(102, 255, 102, 0.2)" : canDrop ? "rgba(204, 255, 0, 0.2)" : isMain ? "#fff" : theme.lightBlue};
  box-shadow: ${({ isMain }) => isMain ? "none" : "0px 0px 20px rgba(0, 0, 0, 0.08)"};
  border-radius: 20px;
  margin-bottom: 28px;
  padding: ${({ isMain }) => isMain ? "0 13px 23px 0" : "23px 13px"};
  width: 476px;
`;


