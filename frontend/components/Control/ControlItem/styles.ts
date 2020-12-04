import styled from 'styled-components';

export const SControlItem = styled.div<{ isDragging?: boolean }>`
  opacity: ${({ isDragging }) => isDragging ? 0 : 1};
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: move;
  background-color: #fff;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05)
  }
`;

export const SControlItemText = styled.div`
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  font-weight: 400;
  span {
    display: inline-block;
    font-weight: 600;
  }
`


