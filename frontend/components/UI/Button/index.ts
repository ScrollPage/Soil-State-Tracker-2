import styled, { css } from 'styled-components';

export const SButton = styled.button<{ width?: string, iswhite?: string, isred?: string, height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  padding: 7px 15px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  ${({ iswhite }) => iswhite === 'true' && css`
    background-color: #fff;
    color: #000;
    &:hover, :focus {
      background-color: #000;
      color: #fff;
  }
  `};
  ${({ isred }) => isred === 'true' && css`
    background-color: red;
    color: #000;
    &:hover, :focus {
      background-color: red;
      color: #000;
  }
  `};
  ${({ isred, iswhite }) => !isred && !iswhite && css`
    background-color: #000;
    color: #fff;
    &:hover, :focus {
      background-color: #fff;
      color: #000;
    }
  `}
  transition: all 0.3s ease -in -out;
`;



