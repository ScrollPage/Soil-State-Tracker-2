import CompanyCreateForm from "@/components/Manage/Company/CompanyCreate/CompanyCreateForm";
import { changeCompany } from "@/store/actions/company";
import React from "react";
import { useDispatch } from "react-redux";
import { SChangeCompanyModal, SChangeCompanyModalTitle } from "./styles";

export interface IChangeCompanyModalProps {
  id: number;
  name: string;
  url: string;
  info: string;
}

interface IChangeCompanyModal extends IChangeCompanyModalProps {
  setClose: () => void;
}

const ChangeCompanyModal: React.FC<IChangeCompanyModal> = ({
  id,
  name,
  url,
  info,
  setClose,
}) => {
  const dispatch = useDispatch();

  const changeHanlder = (
    id: number,
    name: string,
    url: string,
    info: string
  ) => {
    dispatch(changeCompany(id, name, url, info));
    setClose();
  };

  return (
    <SChangeCompanyModal>
      <SChangeCompanyModalTitle>
        Изменение компании&nbsp;{name}
      </SChangeCompanyModalTitle>
      <CompanyCreateForm
        changeHanlder={changeHanlder}
        initialValues={{ id, name, url, info }}
      />
    </SChangeCompanyModal>
  );
};

export default ChangeCompanyModal;
