import styled from "styled-components";

export const TransferWrapper = styled.div`
  @media (max-width: 1199.98px) {
    margin-right: 0px;
    margin-bottom: 10px;
  }
`;

export const ClusterWrapper = styled.div``;

export const Closeable = styled.div<{ height: number | null }>`
  height: ${({ height }) => (height ? `${height + 7}px` : "100%")};
  padding: 0 10px;
  color: #fff;
  background-color: ${({ theme }) => theme.blue};
  /* border-radius: 20px; */
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
`;
