import styled from 'styled-components'

export const Wrapper = styled.div`
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    width: 5px;
    @media (max-width: 575.98px) {
      width: 0px;
    }
  }
  &::-webkit-scrollbar-track {
    height: 90%;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #60CFBF;
  }
`;