import { IAddClusterModalProps } from "@/components/Modal/AddClusterModal";
import { SButton } from "@/components/UI/Button";
import { modalShow } from "@/store/actions/modal";
import React, { memo } from "react";
import { useDispatch } from "react-redux";

const AddComponent = () => {
  const dispatch = useDispatch();

  const showHandler = () => {
    dispatch(modalShow<IAddClusterModalProps>("ADD_CLUSTER_MODAL", {}));
  };

  return (
    <SButton myType="green" onClick={showHandler}>
      Добавить кластер
    </SButton>
  );
};

export const Add = memo(AddComponent);
