import styled from 'styled-components';

export const Title = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 32px;
  margin-bottom: 31px;
`;

export const Wrapper = styled.div`
  margin-left: 57px;
  > hr {
    opacity: 0.5;
  }
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
  }
  .ant-checkbox-wrapper {
    font-family: Play;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    padding: 15px 0;
  }
`;