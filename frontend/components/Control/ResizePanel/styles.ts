import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  max-width: 100%;
`;

export const Left = styled.div<{ width: number | null, leftMin: number }>`
  width: ${({ width }) => width ? `${width}px` : "auto"};
  min-width: ${({ leftMin }) => leftMin}px;
  margin-right: 25px;
`

export const Right = styled.div<{ rightMin: number }>`
  min-width: ${({ rightMin }) => rightMin}px;
  flex: 1;
  margin-left: 25px;
`

export const Resize = styled.div<{ isActive: boolean }>`
  background-color: ${({ theme }) => theme.green};
  border: 1px solid ${({ isActive, theme }) => isActive ? theme.green : "#fff"};
  border-radius: 2.5px;
  position: relative;
  width: 5px;
  cursor: col-resize;
  &:hover { 
    border: 1px solid ${({ theme }) => theme.green};
  }
`

export const Closable = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: -21px;
  padding: 0 5px;
  ${({ isActive }) => isActive ? "left: -61px;" : "right: -62px;"};
  background-color: ${({ theme }) => theme.green};
  color: #fff;
  font-family: Play;
  cursor: pointer;
`