import styled from 'styled-components'

export const MessagesEnd = styled.div``
export const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`
export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;  
  align-items: flex-start;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  position: relative;
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
    background-color: #0099FF;
  }
`;