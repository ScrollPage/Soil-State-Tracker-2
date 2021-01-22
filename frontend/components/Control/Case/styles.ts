import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 20px;
`;

export const Main = styled.div`
  padding-top: 10px;
  font-family: Play;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
`

export const Header = styled.div`
  position: relative;
`

export const Arrow = styled.div<{ isShow: boolean }>`
  height: 17px;
  width: 17px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%) ${({ isShow }) => isShow ? 'rotate(45deg)' : 'rotate(-45deg)'};
  border-bottom: 2px solid #000;
  border-right: 2px solid #000;
  cursor: pointer;
  &:hover { 
    border-bottom: 4px solid ${({ theme }) => theme.orange};
    border-right: 4px solid ${({ theme }) => theme.orange};
  }
`

export const Title = styled.p`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
`

