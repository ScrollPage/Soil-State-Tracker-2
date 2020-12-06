import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert as AntdAlert } from "antd";
import { hide } from "@/store/actions/alert";
import {
  getAlertIsNotClose,
  getAlertText,
  getAlertType,
} from "../../../store/selectors";
import { Wrapper, Content, Text, Close } from "./styles";

const Alert: React.FC = () => {
  const text = useSelector(getAlertText);
  const type = useSelector(getAlertType);
  const isNotClose = useSelector(getAlertIsNotClose);

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
    <Wrapper>
      <Content type={type}>
        <Close onClick={hideHandler} />
        <Text>{text}</Text>
      </Content>
    </Wrapper>
  );
};

export default Alert;
