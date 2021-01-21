import styled from 'styled-components';
import { Wrapper as ControlClusterItem } from '../Cluster/styles';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
  flex: 1;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  ${ControlClusterItem} {
    &:last-of-type {
      margin: 0;
    }
  }
`
