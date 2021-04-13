import styled from 'styled-components'

export const Wrapper = styled.div<{ isActive: boolean }>`
  position: relative;
  padding: 30px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ isActive }) => isActive ? "rgba(204, 235, 255, 0.4)" : "#fff"};
  transition: all .3s ease;
  cursor: pointer;
  &:hover {
    background-color: rgba(204, 235, 255, 0.4);
  }
`;
export const Hero = styled.div`
  display: flex;
  align-items: center;
`;
export const Name = styled.p`
  max-width: 100%;
  margin: 0 0 0 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #000;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;
