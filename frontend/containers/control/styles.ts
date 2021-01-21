import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 69px 80px 80px 80px;
  user-select: none;
  @media (max-width: 1199.98px) {
    padding: 0px 30px 80px 30px;
  }
  @media (max-width: 767.98px) {
    padding: 0px 0px 80px 0px;
  }
`;

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

export const Title = styled.h1`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  color: #000000;
`;

export const Left = styled.div<{ width: number | null }>`
  width: ${({ width }) => width ? `${width}px` : "auto"};
  min-width: 300px;
  margin-right: 25px;
`

export const Right = styled.div`
  min-width: 320px;
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

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  height: 100%;
  position: relative;
  @media (max-width: 1199.98px) {
    flex-direction: column;
  }
`;
