import styled, { css } from 'styled-components';

export const SHeaderMenu = styled.div``;

export const SNavLink = styled.a<{ active?: boolean, isDrower?: boolean }>`
  margin-right: 15px;
  color: #000;
  opacity: 0.5;
  font-weight: 600;
  &:last-of-type {
    margin-right: 0;
  }
  &:hover {
    color: #000;
    opacity: 1;
  }
  ${({ isDrower }) => isDrower && css`
    font-size: 23px;
    font-weight: 400;
    margin-bottom: 8px;
  `}
  ${({ active }) => active && 'opacity: 1'}
`