import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 166px 0;
  background-color: ${({ theme }) => theme.lightBlue};
`;
export const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  text-align: center;
  margin-bottom: 40px;
  font-family: Rosalinda;
  font-style: normal;
  font-weight: normal;
  font-size: 70px;
  line-height: 140px;
  color: #000000;
`;
export const Main = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
export const Circle = styled.div`
  height: 159px;
  width: 159px;
  border-radius: 50%;
  background: #C4C4C4;
  margin: 40px;
`;