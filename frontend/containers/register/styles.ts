import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  padding: 188px 0 110px 0;
`;

export const Inner = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-family: "Play";
  font-weight: normal;
  font-size: 48px;
  line-height: 56px;
  color: ${({ theme }) => theme.white};
  margin-bottom: 84px;
  pointer-events: auto;
`;
export const SubTitle = styled.span`
  margin-top: 20px;
  font-family: "Play";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
`;

export const Bottom = styled.span`
  pointer-events: auto;
  z-index: 2;
  margin-top: 10px;
  > a {
    pointer-events: auto;
    font-family: "Play";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #4753bb;
  }
`;
