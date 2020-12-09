import styled from 'styled-components';

export const SControlItem = styled.div<{ isDragging?: boolean }>`
  opacity: ${({ isDragging }) => isDragging ? 0 : 1};
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  margin-bottom: 27px;
  width: 375px;
  cursor: move;
`;

export const SControlItemText = styled.div`
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


