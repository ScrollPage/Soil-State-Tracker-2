import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert as AntdAlert } from "antd";
import { hide } from "@/store/actions/alert";
import {
  getAlertIsNotClose,
  getAlertText,
  getAlertType,
} from "../../../store/selectors";
import { SAlert } from "./styles";

const Alert: React.FC = () => {
  const text = useSelector(getAlertText);
  const type = useSelector(getAlertType);
  const isNotClose = useSelector(getAlertIsNotClose);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isNotClose) {
      return;
    }
    setTimeout(() => {
      dispatch(hide());
    }, 3000);
  }, [text]);

  const hideHandler = () => {
    dispatch(hide());
  };

  if (!text) return null;

  return (
    <SAlert>
      <AntdAlert message={text} type={type} closable onClose={hideHandler} />
    </SAlert>
  );
};

export default Alert;
