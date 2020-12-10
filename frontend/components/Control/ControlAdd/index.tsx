import { IAddClusterModalProps } from "@/components/Modal/AddClusterModal";
import { modalShow } from "@/store/actions/modal";
import React from "react";
import { useDispatch } from "react-redux";
import { Wrapper } from "./styles";

export const ControlAdd = () => {
  const dispatch = useDispatch();

  const showHandler = () => {
    dispatch(modalShow<IAddClusterModalProps>("ADD_CLUSTER_MODAL", {}));
  };

  return <Wrapper onClick={showHandler} />;
};
