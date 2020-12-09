import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 76px 0 17px 0;
`;
export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
export const About = styled.div`
  display: flex;
  align-items: center;
`;
export const Name = styled.div`
  margin-left: 15px;
`;
export const Title = styled.h2`
  font-family: Raleway;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 42px;
  color: #000000;
  margin-bottom: 6px;
  margin-top: 0;
`;
export const Subtitle = styled.h4`
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  margin-top: 0;
`;
export const Phone = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
  margin-bottom: 13px;
`;
export const Mail = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  margin-bottom: 13px;
`;
export const Text = styled.p`
  font-family: Raleway;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  margin-bottom: 9px;
`;
export const Small = styled.span`
  font-family: Raleway;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`;
export const Social = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 31px;
`;

export const ImageWrapper = styled.div`
  margin-right: 15px;
`;

export const Media = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${Subtitle} {
    margin-bottom: 6px;
    margin-top: 0;
  }
`;
export const Documents = styled.div`
  display: flex;
  flex-direction: column;
`;