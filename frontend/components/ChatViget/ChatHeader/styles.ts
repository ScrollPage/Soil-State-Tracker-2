import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 120px;
  position: relative;
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
  font-size: 20px;
  line-height: 39px;
  > a {
    color: #000;
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }
`;

export const Close = styled.div`
  position: absolute;
  height: 40px;
  width: 40px;
  top: 20px;
  right: -15px;
  cursor: pointer;
  &:hover {
    &:after {
      transform: translateX(-50%) translateY(-50%) rotate(45deg) scale(1.2);
    }
    &:before {
      transform: translateX(-50%) translateY(-50%) rotate(-45deg) scale(1.2);
    }
  }
  &:after, &:before {
    content: '';
    position: absolute;
    height: 30px;
    width: 2px;
    background-color: #000;
    top: 50%;
    left: 50%;
  }
  &:after {
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
  }
  &:before {
      transform: translateX(-50%) translateY(-50%) rotate(-45deg);
  }
`