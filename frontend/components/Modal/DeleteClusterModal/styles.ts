import { SButton } from '@/components/UI/Button';
import styled from 'styled-components';

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${SButton} {
    &:first-of-type {
      margin-bottom: 20px;
    }
  }
`

export const Text = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 32px;
  margin-bottom: 55px;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;


