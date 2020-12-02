import React from "react";
import { SCompanyCreate, SCompanyCreateHeader, SCompanyCreateMain } from "./styles";
import CompanyCreateForm from "./CompanyCreateForm";

const CompanyCreate = () => {
  return (
    <SCompanyCreate>
      <SCompanyCreateHeader>
        <p>Создать компанию</p>
      </SCompanyCreateHeader>
      <SCompanyCreateMain>
        <CompanyCreateForm />
      </SCompanyCreateMain>
    </SCompanyCreate>
  );
};

export default CompanyCreate;
