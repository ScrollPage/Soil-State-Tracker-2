import { SButton } from '@/components/UI/Button';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Footer = styled.div`
  margin-top: 30px;  
  display: flex;
  ${SButton} {
    &:first-of-type {
      margin-right: 10px;
    }
  }
`

export const Text = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  margin-left: 20px;
  margin-top: 10px;
  > span { 
    font-weight: 700;
  }
`

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const Title = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 32px;
`;
