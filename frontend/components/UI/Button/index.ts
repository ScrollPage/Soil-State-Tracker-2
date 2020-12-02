import styled, { css } from 'styled-components';
import { Button } from 'antd';

export const SButton = styled(Button) <{ width?: string, iswhite?: string, isred?: string, height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ iswhite }) => iswhite === 'true' && css`
    background-color: #fff;
    color: #000;
    &:hover, :focus {
      background-color: #000;
      color: #fff;
      border: 1px solid #d9d9d9;
  }
  `};
  ${({ isred }) => isred === 'true' && css`
    background-color: red;
    color: #000;
    &:hover, :focus {
      background-color: red;
      color: #000;
      border: 1px solid #d9d9d9;
  }
  `};
  ${({ isred, iswhite }) => !isred && !iswhite && css`
    background-color: #000;
    color: #fff;
    &:hover, :focus {
      background-color: #fff;
      color: #000;
      border: 1px solid #d9d9d9;
    }
  `}
  transition: all 0.3s ease -in -out;
`;



