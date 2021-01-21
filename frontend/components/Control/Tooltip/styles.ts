import styled from 'styled-components';

export const Wrapper = styled.h2`
  text-align: center;
  margin: 0 0 5px 0;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.orange};
  > span {
    color: ${({ theme }) => theme.orange};
    margin-right: 10px;
    cursor: pointer;
  }
  span, p {
    display: inline-block;
  }
  p {
    font-size: 26px;
    cursor: pointer;
  }
`