import styled from 'styled-components';

export const SChatInput = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
  > form {
    width: 100%;
    display: flex;
    padding: 10px;
    > div {
      &:first-of-type {
        flex: 1;
        margin-right: 10px;
      }
      flex: 0;
    }
  }
`;
