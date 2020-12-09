import styled from 'styled-components';
import { Wrapper as ControlClusterItem } from '../ControlClusterItem/styles';

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
