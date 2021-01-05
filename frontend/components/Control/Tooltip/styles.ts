import styled from 'styled-components';

export const Wrapper = styled.h2`
  text-align: center;
  margin: 0 0 31px 0;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: ${({ theme }) => theme.orange};
  > a {
    color: ${({ theme }) => theme.orange};
  }
`