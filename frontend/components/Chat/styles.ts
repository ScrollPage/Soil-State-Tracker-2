import styled from 'styled-components';

export const SChat = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  width: 100%;
  height: calc(100vh - 80px);
`;

export const SChatLeft = styled.div`
  display: flex; 
  flex-direction: column;
  width: 200px;
`;

export const SChatRight = styled.div`
  display: flex; 
  flex-direction: column;
  flex: 1;
  border-left: 1px solid #ccc;
`;

export const SChatSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #ccc;
`;

export const SChatLeftInner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
    @media (max-width: 575.98px) {
      width: 0px;
    }
    }
  &::-webkit-scrollbar-track {
    height: 90%;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #000;
  }
`;
