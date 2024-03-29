import styled, { css } from 'styled-components';

export const SButton = styled.button<{ myType: "red_plus" | "green_plus" | "white" | "blue" | "orange" | "green" | "red", small?: boolean }>`
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  font-style: normal;
  pointer-events: auto;

  ${({ myType, theme }) => myType === 'green_plus' && css`
    text-align: left !important;
    padding: 0 21px;
    min-width: 244px;
    height: 50px;
    background-color: ${theme.green};
    color: #fff;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
    border-radius: 20px;
    border: none;
    position: relative;
    font-family: Play;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 14px;
    &:hover {
      box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.2);
    }
    &:after, &:before {
      content: '';
      position: absolute;
      right: 25px;
      top: 50%;
      transform: translateY(-50%);
      height: 25px;
      width: 5px;
      background-color: #fff;
    }
    &:before {
      transform: translateY(-50%) rotate(90deg);
    }
  `};

  ${({ myType, theme, small }) => myType === 'green' && css`
    width: ${small ? "150px" : "300px"};
    height: 45px;
    background-color: ${theme.green};
    color: #fff;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
    border-radius: 20px;
    border: none;
    font-family: Play;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.2);
    }
  `};

  ${({ myType, theme }) => myType === 'red_plus' && css`
    width: 50px;
    height: 45px;
    background-color: ${theme.red};
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    border: none;
    position: relative;
    &:hover {
      box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.2);
    }
    &:after, &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateY(-50%) translateX(-50%) rotate(45deg);
      width: 5px;
      height: 25px;
      background-color: #fff;
    }
    &:before {
      transform: translateY(-50%) translateX(-50%) rotate(-45deg);
    }
  `};
  ${({ myType, theme }) => myType === 'red' && css`
    width: 100%;
    height: 45px;
    background-color: ${theme.red};
    color: #fff;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    border: none;
    font-family: Play;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.2);
    }
  `};

  ${({ myType, small }) => myType === 'white' && css`
    height: 45px;
    border-radius: 10px;
    width: ${small ? "125px" : "300px"};
    background-color: transparent;
    border: 1px solid #fff;
    font-family: "Play";
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #fff;
    &:hover {
      background-color: #fff;
      color: #000;
    }
  `};

  ${({ myType, small }) => myType === 'orange' && css`
    height: 45px;
    border-radius: 10px;
    width: ${small ? "150px" : "300px"};
    background-color: ${({ theme }) => theme.orange};
    border: 1px solid ${({ theme }) => theme.orange};
    font-family: "Raleway";
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;      
    color: #FFFFFF;
    &:hover {
      background-color: transparent;
    }
  `};

  ${({ myType, small, theme }) => myType === 'blue' && css`
    height: 50px;
    border-radius: 10px;
    width: ${small ? "150px" : "300px"};
    background-color: transparent;
    border: 1px solid ${theme.blue};
    font-family: "Play";
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: ${theme.blue};
    &:hover {
      background-color: ${theme.blue};
      color: #fff;
    }
  `};

  transition: background-color 0.3s ease;
  &:disabled {
    pointer-events: none;
  }
`;



