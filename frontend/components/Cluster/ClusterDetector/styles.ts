import styled from 'styled-components';

export const Field = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;

export const Wrapper = styled.div`
  width: 250px;
  height: 140px;
  margin: 0 10px 60px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.lightBlue};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  ${Field} {
    &:last-of-type {
      margin-bottom: 13px;
    }
  }
`;