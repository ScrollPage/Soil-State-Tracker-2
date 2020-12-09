import styled from 'styled-components';

export const Wrapper = styled.div<{ isDragging?: boolean }>`
  opacity: ${({ isDragging }) => isDragging ? 0 : 1};
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 130px;
  width: 130px;
  margin: 10px;
  cursor: move;
`;

export const Text = styled.div`
  margin-top: 10px;
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


