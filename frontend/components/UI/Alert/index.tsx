import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "@/store/actions/alert";
import { getAlertInfo } from "@/store/selectors";
import { Wrapper, Content, Text, Close } from "./styles";

const AlertComponent: React.FC = () => {
  const { text, type, isNotClose } = useSelector(getAlertInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isNotClose) {
      return;
    }
    setTimeout(hideHandler, 3000);
  }, [text]);

  const hideHandler = () => {
    dispatch(hide());
  };

  if (!text) return null;

  return (
    <Wrapper data-testid="alert">
      <Content type={type}>
        <Close onClick={hideHandler} />
        <Text>{text}</Text>
      </Content>
    </Wrapper>
  );
};

export const Alert = memo(AlertComponent);
