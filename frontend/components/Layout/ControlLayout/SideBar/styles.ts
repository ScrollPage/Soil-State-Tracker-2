import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background: url("/control/rectangle.svg") no-repeat top left;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`

export const Side = styled.div``

export const SideLink = styled.div<{ active?: boolean }>`
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  background-color: ${({ active }) => active ? "#F6F6F6" : "#FFFFFF"};
  border-left: 10px solid ${({ active, theme }) => active ? theme.green : "#FFFFFF"};
  > a {
    transition: all .2s ease;
    &:hover {
      transform: scale(1.3);
    }
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