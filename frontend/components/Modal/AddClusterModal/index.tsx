import { AddForm, AddFormValues } from "@/components/Control/AddForm";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { addCluster, changeClusterInfo } from "@/store/actions/cluster";
import { Wrapper } from "./styles";

export interface IAddClusterModalProps {
  initialValues?: AddFormValues;
  id?: number;
}

interface IAddClusterModal extends IAddClusterModalProps {
  setClose: () => void;
}

const AddClusterModalComponent: React.FC<IAddClusterModal> = ({
  setClose,
  initialValues,
  id,
}) => {
  const dispatch = useDispatch();

  const onSubmit = (values: AddFormValues) => {
    if (id) {
      dispatch(changeClusterInfo(id, values));
    } else {
      dispatch(addCluster(values));
    }
  };

  return (
    <Wrapper>
      <AddForm
        setClose={setClose}
        handleSubmit={onSubmit}
        initialValues={initialValues}
      />
    </Wrapper>
  );
};

export const AddClusterModal = memo(AddClusterModalComponent);
