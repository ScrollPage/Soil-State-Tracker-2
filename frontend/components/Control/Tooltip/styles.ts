import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  > span {
    font-family: Play;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    margin-right: 10px;
    cursor: pointer;
    display: inline-block;
  }
`

export const Arrow = styled.div<{ isShow: boolean }>`
  transform: translateY(-50%) ${({ isShow }) => isShow ? 'rotate(45deg)' : 'rotate(-45deg)'};
  height: 17px;
  width: 17px;
  position: absolute;
  right: 10px;
  top: 50%;
  border-bottom: 2px solid #000;
  border-right: 2px solid #000;
  cursor: pointer;
  &:hover { 
    border-bottom: 4px solid ${({ theme }) => theme.orange};
    border-right: 4px solid ${({ theme }) => theme.orange};
  }
`