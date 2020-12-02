import styled from "styled-components";

export const SControl = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SControlTitle = styled.h1`
  display: flex;
  justify-content: center;
  font-weight: 800;
  font-size: 36px;
  @media(max-width: 767.98px) {
    font-size: 26px;
  }
`;

export const SControlMain = styled.div`
  display: flex;
  flex-direction: row;
  @media(max-width: 767.98px) {
    flex-direction: column;
  }
`;
