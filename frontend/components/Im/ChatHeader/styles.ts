import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 120px;
  background-color: ${({ theme }) => theme.blueBgc};
`;
export const Hero = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Name = styled.p`
  margin: 0 0 0 25px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  > a {
    color: #000;
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }
`;