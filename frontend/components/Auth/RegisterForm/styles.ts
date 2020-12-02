import styled from 'styled-components';
import { SButton } from "@/components/UI/Button";

export const SRegisterForm = styled.div`
  height: 100%;
  > form {
    height: 100%;
  }
`;

export const SFormikStepper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const SFormikStepperMain = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${SButton} {
    flex: 0;
    margin-bottom: 10px;
  }
`;
export const SFormikStepperBtn = styled.div`
  flex: 0;
  ${SButton} {
    margin-bottom: 10px;
  }
`;

export const SFormikStepHeader = styled.h3`
  flex: 1;
  text-align: center;
  margin-top: 40px;
`;

