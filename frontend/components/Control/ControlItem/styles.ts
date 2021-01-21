import styled from 'styled-components';

export const Wrapper = styled.div<{ isDragging?: boolean, isChoose: boolean }>`
  opacity: ${({ isDragging }) => isDragging ? 0 : 1};
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  cursor: move;
  color: ${({ theme, isChoose }) => isChoose ? theme.orange : '#000'};
`;

export const Text = styled.div`
  margin: 10px;
  user-select: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  span {
    display: inline-block;
  }
`


