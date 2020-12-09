import styled from "styled-components";

export const Wrapper = styled.div``

export const Header = styled.div`
  position: fixed;
  top: 0; 
  left: 249px;
  width: 100%;
  height: 120px;
  z-index: 4;
  background: url(main/bgc.png) bottom no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding: 0 50px 0 50px;
  display: flex;
  justify-content: space-between;
`

export const SideBar = styled.div`
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background: url(control/rectangle.svg) no-repeat top left;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`

export const Side = styled.div``

export const NavLink = styled.div`
 > a {
  font-family: "Play";
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: #FFFFFF;
  margin-left: 50px;
 }
`

export const SideLink = styled.div<{ active?: boolean }>`
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  background-color: ${({ active }) => active ? "#F6F6F6" : "#FFFFFF"};
  border-left: 10px solid ${({ active, theme }) => active ? theme.orange : "#FFFFFF"};
  > a {
    font-family: "Play";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
  }
`

export const Name = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
`

export const Rectangle = styled.div`
  padding: 42px 50px;
  height: 336px;
  display: flex;
  flex-direction: column;
`
export const Circle = styled.div`
  height: 74px;
  width: 74px;
  border-radius: 50%;
  background-color: #C4C4C4;
  margin-bottom: 32px;
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

export const Main = styled.div`
  height: 100%;
  display: flex;
  padding: 120px 0 0 250px;
`;