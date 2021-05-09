import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  max-width: 100%;
  user-select: none;
  padding-bottom: 40px;
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
export const Closable = styled.div<{ isActive: boolean }>`
  display: none;
  position: absolute;
  top: -23px;
  left: 50%;
  transform: translateX(-50%);
  height: 25px;
  width: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 30px;
  ${({ isActive }) => isActive && "transform: translateX(-50%) rotate(45deg)"};
  background-color: ${({ theme }) => theme.green};
  color: #fff;
  font-family: Play;
  cursor: pointer;
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
    ${Closable} {
      display: flex;
    }
  }
`
