import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 549px;
  margin: 0 auto;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-color: #FFF;
    height: 4px;
    width: 55%;
    @media (max-width: 500px) {
      width: 120px;
    }
  }
`;

export const Step = styled.div<{ active: boolean }>`
  height: 70px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  &:after, &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    border-radius: 50%;
  }
  &:after {
    height: 10px;
    width: 10px;
    background-color: #FFF;
  }
  ${({ active }) => active && css`
    &:before {
      height: 30px;
      width: 30px;
      background-color: transparent;
      border: 1px solid #FFF;
    }
  `};
`;


export const Title = styled.div<{ active: boolean }>`
  font-family: "Play";
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 14px;
  color: #FFFFFF;
  opacity: ${({ active }) => active ? 1 : 0.7};
`;