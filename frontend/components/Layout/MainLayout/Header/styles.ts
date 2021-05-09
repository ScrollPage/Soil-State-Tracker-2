import styled from "styled-components";

export const Wrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  padding: 25px 0;
  height: 200px;
  position: fixed;
  height: 120px;
  background-color: #fff;
  z-index: 4;
  color: ${({ theme }) => theme.blue};
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`

export const MenuItem = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.blue};
  }
`

export const Name = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  margin: 10px 0 0 0;
  color: ${({ theme }) => theme.blue};
`;
export const SubTitle = styled.p`
  width: 240px;
  font-size: 16px;
`;

export const AuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Auth = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  > img {
    margin-bottom: 22px;
  }
`
export const AuthTitle = styled.p`
  margin: 0;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.blue};
  }
`

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
`;