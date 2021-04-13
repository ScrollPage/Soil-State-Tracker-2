import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 600px;
  background-color: #fff;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  padding: 0 30px 30px 30px;
  border-radius: 25px;
  border: 3px solid ${({ theme }) => theme.blue}
`