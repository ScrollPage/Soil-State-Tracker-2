import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 216px;
`

export const Wrapper = styled.div<{ isOver: boolean, canDrop: boolean }>`
  background-color: ${({ canDrop, isOver, theme }) => isOver ? "rgba(102, 255, 102, 0.2)" : canDrop ? "rgba(204, 255, 0, 0.2)" : theme.lightBlue};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  margin-bottom: 28px;
  padding: 23px 13px;
`;


