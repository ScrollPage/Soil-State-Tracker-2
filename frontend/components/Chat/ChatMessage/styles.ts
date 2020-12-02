import styled from 'styled-components';

export const SChatMessage = styled.div`
  display: flex;
  padding: 10px;
  align-items: flex-start;
`;

export const SChatMessageAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex: 0 0 30px;
  > div {
    background-color: #ccc;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
`;
export const SChatMessageInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const SChatMessageDescr = styled.div`
  display: flex;
  justify-content: space-between;
  > p {
    margin-right: 10px;
    font-weight: 500;
  }
`;
export const SChatMessageContent = styled.p``;

