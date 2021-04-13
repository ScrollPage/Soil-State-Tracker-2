import styled from 'styled-components'

export const Wrapper = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
`

export const Button = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  height: 80px;
  width: 80px;
  z-index: 5;
  background-color: ${({ theme }) => theme.blue};
  transform-origin: center;
  transition: transform 0.15s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  > img {
    max-height: 100%;
  }
`