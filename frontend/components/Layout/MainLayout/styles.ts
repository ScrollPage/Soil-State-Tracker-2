import styled from "styled-components";

export const Header = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  padding: 72px 60px;
  position: fixed;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
export const Info = styled.div`
  display: flex;
  align-items: center;
`;
export const Name = styled.div`
  margin-left: 33px;
`;
export const Title = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 42px;
  color: #FFFFFF;
  margin-bottom: 11px;
`;
export const Subtitle = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #FFFFFF;
`;

export const AuthButtons = styled.div`
  width: 333px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;
`;

export const NavLink = styled.div`
  > a {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;
    color: #FFFFFF;
    margin-right: 50px;
  }
`;

export const Nav = styled.div`
  display: flex;
  ${NavLink} {
    &:last-of-type {
      margin-right: -50px;
    }
  }
`;

export const Inner = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Main = styled.div`
  height: 100%;
  display: flex;
`;
