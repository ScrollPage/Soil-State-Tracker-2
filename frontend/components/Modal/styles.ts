import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    z-index: 10;
    width: 600px;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    @media (max-width: 575.98px) {
        width: 90%;
        > div {
            padding: 40px 10px !important;
        }
    }
    > div {
        position: relative;
        height: 100%;
        width: 100%;
        background-color: #fff;
        padding: 40px;
        border-radius: 5px;
        border: 1px solid #d9d9d9;
        .root-modal__close {
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
        }
    }
`;

export const Close = styled.div`
    position: absolute;
    height: 18px;
    width: 18px;
    top: 15px;
    right: 15px;
    cursor: pointer;
    &:after, &:before {
      content: '';
      position: absolute;
      height: 18px;
      width: 3px;
      background-color: #000;
      top: 50%;
      left: 50%;
    }
    &:after {
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
    }
    &:before {
        transform: translateX(-50%) translateY(-50%) rotate(-45deg);
    }
`

export const BackDrop = styled.div`
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

