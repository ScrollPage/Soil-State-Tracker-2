import { SButton } from '@/components/UI/Button';
import styled from "styled-components";

export const SControlUser = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-bottom: none;
`;

export const SControlUserArrows = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-top: 1px solid #f0f0f0;
  ${SButton} {
    &:first-of-type {
      margin-bottom: 10px;
    }
  }
`;

export const SControlUserMain = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SControlUserTitle = styled.h4`
  padding: 10px;
  display: flex;
  justify-content: center;
`;