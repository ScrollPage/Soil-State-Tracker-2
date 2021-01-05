import styled from "styled-components";

export const Wrapper = styled.div<{ small: boolean }>`
  top: 0;
  left: 0;
  width: 100%;
  padding: 72px 60px;
  position: fixed;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 4;
  color: ${({ small }) => small ? "#000000" : "#FFFFFF"};
  a {
    color: ${({ small }) => small ? "#000000" : "#FFFFFF"};
  }
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
  margin-bottom: 11px;
`;
export const SubTitle = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
`;

export const AuthButtons = styled.div`
  width: 333px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;
`;

export const NavLink = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  margin-left: 50px;
  cursor: pointer;
`;

export const Nav = styled.div`
  display: flex;
`;

export const Inner = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;