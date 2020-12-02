import styled from 'styled-components';

export const SChatWidget = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 20px;
  right: 40px;  
  height: 410px;
  width: 310px;
  border: 1px solid #ccc;
  background-color: #fff;
`;
export const SChatWidgetBtn = styled.div`
  position: fixed;
  bottom: 0;
  right: 40px;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border-radius: 20px 20px 0 0;
  cursor: pointer;
`;

export const SChatWidgetTop = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px;
  > h3 {
    margin-bottom: 0;
  }
`;

export const SChatWidgetMessages = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* border-bottom: 1px solid #ccc; */
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
export const SChatWidgetClose = styled.div`
  position: absolute;
  right: -10px;
  top: -10px;
  border-radius: 50%;
  background-color: #000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
`;