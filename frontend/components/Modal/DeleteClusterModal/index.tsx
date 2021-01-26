import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Text, Footer } from "./styles";
import { SButton } from "@/components/UI/Button";
import { deleteCluster } from "@/store/actions/cluster";

export interface IDeleteClusterModalProps {
  id: number;
  onChoose: () => void;
}

interface IDeleteClusterModal extends IDeleteClusterModalProps {
  setClose: () => void;
}

const DeleteClusterModalComponent: React.FC<IDeleteClusterModal> = ({
  setClose,
  onChoose,
  id,
}) => {
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(deleteCluster(id));
    setClose();
    onChoose();
  };

  return (
    <Wrapper>
      <Text>Вы действительно хотите удалить группу?</Text>
      <Footer>
        <SButton onClick={setClose} myType="green">
          Отменить
        </SButton>
        <SButton onClick={onSubmit} myType="red">
          Удалить
        </SButton>
      </Footer>
    </Wrapper>
  );
};

export const DeleteClusterModal = memo(DeleteClusterModalComponent);
