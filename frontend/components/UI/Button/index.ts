import styled, { css } from 'styled-components';

export const SButton = styled.button<{ myType: "white" | "blue" | "orange", small?: boolean }>`
  width: ${({ small }) => small ? "150px" : "350px"};
  height: 60px;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  ${({ myType }) => myType === 'white' && css`
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 20px;
    font-family: "Play";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #fff;
    &:hover {
      background-color: #fff;
      color: #000;
    }
  `};

  ${({ myType }) => myType === 'orange' && css`
    background-color: ${({ theme }) => theme.orange};
    border: 1px solid ${({ theme }) => theme.orange};
    border-radius: 20px;
    font-family: Raleway;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;      
    color: #FFFFFF;
    &:hover {
      background-color: transparent;
    }
  `};

  ${({ myType }) => myType === 'blue' && css`
    border-radius: 10px;
    font-family: Play;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    line-height: 25px;
    color: #fff;
  `};

  transition: all 0.3s ease -in -out;
`;



