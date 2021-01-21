import styled, { css } from 'styled-components';

export const SButton = styled.button<{ myType: "white" | "blue" | "orange" | "green", small?: boolean }>`
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  font-style: normal;
  pointer-events: auto;

  ${({ myType, theme }) => myType === 'green' && css`
    text-align: left !important;
    padding: 17px 21px;
    min-width: 244px;
    background-color: ${theme.green};
    color: #fff;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
    border-radius: 20px;
    border: none;
    position: relative;
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

  ${({ myType, small }) => myType === 'white' && css`
    height: 60px;
    border-radius: 20px;
    width: ${small ? "150px" : "350px"};
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
    height: 60px;
    border-radius: 20px;
    width: ${small ? "150px" : "350px"};
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
    height: ${small ? 'auto' : '60px'};
    border-radius: ${small ? '10px' : '20px'};
    font-size: ${small ? '12px' : '18px'};
    line-height: ${small ? '15px' : '22px'};
    padding: ${small ? '7px 21px' : '16px 31px'};
    min-width: ${small ? '110px' : '218px'};
    background-color: ${small ? "#FFF" : theme.lightBlue};
    border: 1px solid ${({ theme }) => theme.lightBlue};
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
    font-family: Montserrat;
    color: #000000;
    font-weight: normal;
    &:hover {
      /* background-color: transparent; */
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
    }
  `};

  transition: background-color 0.3s ease;
  &:disabled {
    pointer-events: none;
  }
`;



