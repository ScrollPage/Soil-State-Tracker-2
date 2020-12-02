import styled from "styled-components";

export const SLayout = styled.div`
  height: 100%;
  -webkit-transform: translate(0,0);
  transform: translate(0,0);
`;

export const SMain = styled.div`
  padding-top: 60px;
  height: 100%;
  /* background-color: #EEF2F7; */
`;

export const SBackDrop = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 5;
`;

