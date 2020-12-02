import React from "react";
import { useDispatch } from "react-redux";
import {
  SDeleteCompanyModal,
  SDeleteCompanyModalBtns,
  SDeleteCompanyModalTitle,
} from "./styles";
import { SButton } from "@/components/UI/Button";
import { deleteCompany } from "@/store/actions/company";

export interface IDeleteCompanyModalProps {
  id: number;
  name: string;
}

interface IDeleteCompanyModal extends IDeleteCompanyModalProps {
  setClose: () => void;
}

const DeleteCompanyModal: React.FC<IDeleteCompanyModal> = ({
  name,
  id,
  setClose,
}) => {
  const dispatch = useDispatch();

  const deleteHanlder = () => {
    dispatch(deleteCompany(id));
    setClose();
  };

  return (
    <SDeleteCompanyModal>
      <SDeleteCompanyModalTitle>
        Вы дейтвительно хотите удалить компанию&nbsp;{name}?
      </SDeleteCompanyModalTitle>
      <SDeleteCompanyModalBtns>
        <SButton width={"100px"} onClick={deleteHanlder}>
          Да
        </SButton>
        <SButton width={"100px"} iswhite={"true"} onClick={setClose}>
          Нет
        </SButton>
      </SDeleteCompanyModalBtns>
    </SDeleteCompanyModal>
  );
};

export default DeleteCompanyModal;
