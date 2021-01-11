import { AddForm } from "@/components/Control/AddForm";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { addCluster } from "@/store/actions/cluster";
import { Wrapper } from "./styles";

export interface IAddClusterModalProps {}

interface IAddClusterModal extends IAddClusterModalProps {
  setClose: () => void;
}

const AddClusterModalComponent: React.FC<IAddClusterModal> = ({ setClose }) => {
  const dispatch = useDispatch();

  const onSubmit = (name: string) => {
    dispatch(addCluster(name));
  };

  return (
    <Wrapper>
      <AddForm setClose={setClose} handleSubmit={onSubmit} />
    </Wrapper>
  );
};

export const AddClusterModal = memo(AddClusterModalComponent);
