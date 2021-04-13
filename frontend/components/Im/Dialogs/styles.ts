import styled from 'styled-components'

export const Wrapper = styled.div`
  background: #FFFFFF;
  border-right: 1px solid ${({ theme }) => theme.blue};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;