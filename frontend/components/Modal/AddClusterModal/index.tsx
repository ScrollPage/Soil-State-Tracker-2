import { AddForm, AddFormValues } from "@/components/Control/AddForm";
import React, { memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addCluster, changeClusterInfo } from "@/store/actions/cluster";
import { Wrapper, Text } from "./styles";

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

  const isChange = useMemo(() => !!id, [id]);

  const onSubmit = (values: AddFormValues) => {
    if (isChange && id) {
      dispatch(changeClusterInfo(id, values));
    } else {
      dispatch(addCluster(values));
    }
  };

  return (
    <Wrapper>
      <Text>{isChange ? "Редактировать группу" : "Добавить группу"}</Text>
      <AddForm
        setClose={setClose}
        handleSubmit={onSubmit}
        initialValues={initialValues}
      />
    </Wrapper>
  );
};

export const AddClusterModal = memo(AddClusterModalComponent);
