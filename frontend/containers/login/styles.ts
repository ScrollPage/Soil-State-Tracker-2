import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  padding: 150px 0 0px 0;
  @media (max-width: 940px) {
    padding: 115px 0 0px 0;
  }
`;

export const Inner = styled.div`
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
  margin-top: 20px;
  @media (max-width: 500px) {
    font-size: 30px;
    margin-top: 0px;
    margin-bottom: 20px;
  }
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
  z-index: 10;
  pointer-events: auto;
  margin-top: 10px;
  > a {
    font-family: "Play";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #4753bb;
  }
`;
