import { SButton } from '@/components/UI/Button';
import styled from "styled-components";

export const SCompanyItem = styled.div`
  height: 290px;
  width: 250px;
  margin: 0 5px;
  margin-bottom: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  > div {
    padding: 10px;
  }
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const SCompanyItemMain = styled.div`
  flex: 1;
  span {
    font-weight: 500;
  }
`;
export const SCompanyItemBtns = styled.div`
  flex: 0;
  display: flex;
  flex-direction: row;
  ${SButton} {
    &:first-of-type {
      margin-right: 10px;
    }
  }
`;

export const SCompanyItemHeader = styled.div`
  a {
    font-size: 18px;
  }
  border-bottom: 2px solid rgba(0, 0, 0, 0.1)
`;

