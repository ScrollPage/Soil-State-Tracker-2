import styled, { css } from 'styled-components'

export const Wrapper = styled.div``;

export const ClusterMarker = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
  color: #fff;
  background: #1978c8;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

export const Inner = styled.div<{ isFullScreen: boolean }>`
  ${({ isFullScreen }) => isFullScreen && css`
    position: fixed;
    top: 0;
    left: 0;
    height: 100% !important;
    width: 100%;
  `}
  display: flex;
  z-index: 20;
  height: 526px;
`

export const SideBar = styled.div``

export const Title = styled.h1`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  margin: 70px 0;
  color: #000000;
`;

export const DetectorBtn = styled.button`
  border: none;
  background-color: transparent;
  height: 70px;
  outline: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  > img {
    max-height: 100%;
  }
`;
