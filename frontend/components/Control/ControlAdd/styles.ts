import styled from 'styled-components';

export const Wrapper = styled.div`
  cursor: pointer;
  margin: 0 auto;
  background: ${({ theme }) => theme.lightBlue};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  height: 95px;
  width: 160px;
  position: relative;
  transition: all 0.2s ease;
  &:after, &:before {
    height: 30px;
    width: 6px;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: ${({ theme }) => theme.orange};
  }
  &:after {
    transform: translateX(-50%) translateY(-50%) rotate(90deg);
  }
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  }
`;