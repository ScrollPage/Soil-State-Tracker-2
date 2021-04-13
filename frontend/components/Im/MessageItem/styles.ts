import styled, { css } from 'styled-components'

export const Header = styled.div`
  display: flex;
`
export const Time = styled.span`
  opacity: 0.5;
  font-size: 12px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
`
export const Title = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 800;
  font-size: 17px;
  line-height: 15px;
  margin: 0 10px 10px 0;
`
export const Text = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  margin: 0;
  word-break: break-all;
`
export const Wrapper = styled.div<{ isActive: boolean }>`
  border: 1px solid ${({ theme }) => theme.green};
  display: flex;
  margin-bottom: 20px;
  padding: 19px 25px;
  max-width: 90%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  ${({ isActive }) => isActive && css`
    float: right;
    background-color: rgba(96, 207, 191, 0.18);
  ` }
`;
