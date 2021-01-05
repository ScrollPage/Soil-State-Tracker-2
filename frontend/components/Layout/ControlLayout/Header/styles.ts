import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0; 
  left: 249px;
  width: 100%;
  height: 120px;
  z-index: 4;
  background: url("/main/bgc.png") bottom no-repeat #000;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding: 0 50px 0 50px;
  display: flex;
  justify-content: space-between;
`


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