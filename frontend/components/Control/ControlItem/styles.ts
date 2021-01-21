import styled from 'styled-components';

export const Wrapper = styled.div<{ isDragging?: boolean, isChoose: boolean }>`
  opacity: ${({ isDragging }) => isDragging ? 0 : 1};
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  cursor: move;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme, isChoose }) => isChoose ? theme.orange : 'transparent'};
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const Text = styled.div`
  margin: 10px;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  span {
    display: inline-block;
  }
`


