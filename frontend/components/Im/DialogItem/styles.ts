import styled from 'styled-components'

export const Wrapper = styled.div<{ isActive: boolean }>`
  position: relative;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  background-color: ${({ isActive }) => isActive ? "rgba(96, 207, 191, 0.18)" : "#fff"};
  transition: all .3s ease;
  cursor: pointer;
  &:hover {
    background-color: rgba(96, 207, 191, 0.18);
  }
  border-bottom: 1px solid ${({ theme }) => theme.blue}
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

export const Name = styled.p`
  max-width: 100%;
  margin: 0;
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

export const Message = styled.p`
  margin: 10px 0 0 0;
  opacity: 0.5;
  font-size: 14px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  text-overflow: ellipsis;
`