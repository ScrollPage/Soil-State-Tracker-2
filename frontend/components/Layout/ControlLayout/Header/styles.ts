import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 249px;
  width: calc(100% - 249px);
  height: 120px;
  z-index: 4;
  background: ${({ theme }) => theme.blue};
  padding: 0 50px 0 50px;
  display: flex;
  justify-content: space-between;
`


export const NavLink = styled.div<{ isActive: boolean }>`
 > a {
  font-family: "Play";
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: #FFFFFF;
  border-bottom: 2px solid ${({ isActive }) => isActive ? "#fff" : "transparent"};
  margin-left: 50px;
 }
`

export const Nav = styled.div`
  display: flex;
  height: 100%;
  display: flex;
  align-items: center;
`

export const Settings = styled.div`
  display: flex;
  align-items: center;
`