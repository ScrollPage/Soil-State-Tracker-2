import { AddForm } from "@/components/Control/AddForm";
import React from "react";
import { Wrapper } from "./styles";

export interface IAddClusterModalProps {}

interface IAddClusterModal extends IAddClusterModalProps {
  setClose: () => void;
}

const AddClusterModal: React.FC<IAddClusterModal> = ({ setClose }) => {
  return (
    <Wrapper>
      <AddForm setClose={setClose} />
    </Wrapper>
  );
};

export default AddClusterModal;
