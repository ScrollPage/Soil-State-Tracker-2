import styled from 'styled-components'

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
