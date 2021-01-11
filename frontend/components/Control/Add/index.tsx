import { IAddClusterModalProps } from "@/components/Modal/AddClusterModal";
import { modalShow } from "@/store/actions/modal";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper } from "./styles";

const AddComponent = () => {
  const dispatch = useDispatch();

  const showHandler = () => {
    dispatch(modalShow<IAddClusterModalProps>("ADD_CLUSTER_MODAL", {}));
  };

  return <Wrapper onClick={showHandler} />;
};

export const Add = memo(AddComponent);
