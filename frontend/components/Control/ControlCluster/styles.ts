import styled from 'styled-components';
import { SControlClusterItem } from '../ControlClusterItem/styles';

export const SControlCluster = styled.div`
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  ${SControlClusterItem} {
    &:last-of-type {
      margin: 0;
    }
  }
`
