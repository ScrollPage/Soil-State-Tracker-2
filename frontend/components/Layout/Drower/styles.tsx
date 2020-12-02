import styled from "styled-components";
import { SItemBtn } from "@/components/Header/styles";

export const SDrower = styled.div`
  position: fixed;
  top: 0;
  right: -280px;
  height: 100vh;
  width: 280px;
  padding: 40px;
  background: #fff;
  border-left: 1px solid #f0f0f0;
  z-index: 12;
`;

export const SDrowerPages = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SDrowerAuth = styled.div`
  display: flex;
  flex-direction: column;
  ${SItemBtn} {
    &:first-of-type {
      margin-bottom: 20px;
      text-align: center;
    }
  }
`;

export const SDrowerInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SDrowerItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  &:last-of-type {
    height: 100%;
  }
  ${SDrowerPages} {
    flex: 1;
  }
  ${SDrowerAuth} {
    flex: 0;
  }
`;

export const SDrowerClose = styled.div`
  position: absolute;
  right: -20px;
  top: -25px;
`;
