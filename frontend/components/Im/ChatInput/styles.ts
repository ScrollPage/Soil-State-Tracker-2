import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-bottom: 30px;
  background-color: transparent;
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  > img {
    max-height: 100%;
  }
`;

export const Input = styled.input`
  width: 100%;
  background-color: rgba(196, 196, 196, 0.3);
  backdrop-filter: blur(4px);
  font-family: Play;
  color: #fff;
  font-size: 18px;
  border-radius: 20px;
  outline: none;
  padding: 20px 35px;
  color: rgba(0, 0, 0, 0.7);
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  border: none;
  ::placeholder {
    color: #000;
    font-size: 18px;
    font-family: Play;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.4);
  }  
`;