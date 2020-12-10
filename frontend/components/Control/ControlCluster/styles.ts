import styled from 'styled-components';
import { Wrapper as ControlClusterItem } from '../ControlClusterItem/styles';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  color: #000000;
  margin-bottom: 39px;
`

export const Wrapper = styled.div`
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  ${ControlClusterItem} {
    &:last-of-type {
      margin: 0;
    }
  }
`
