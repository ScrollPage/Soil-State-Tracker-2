import { ICompany } from "@/types/company";
import React from "react";
import useSWR from "swr";
import CompanyItem from "./CompanyItem";
import { SCompany, SCompanyTitle, SCompanyMain } from "./styles";
import CompanyCreate from "./CompanyCreate";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import ErrorMessage from "@/components/UI/ErrorMessage";
import EmptyMessage from "@/components/UI/EmptyMessage";

interface ICompanyFC {
  company: ICompany[] | null;
}

const renderCompanyItems = (company: ICompany[]) => {
  if (company.length === 0)
    return <EmptyMessage message="У вас нет компаний..." />;

  return company.map((companyItem) => (
    <CompanyItem
      key={`companyItem__key__${companyItem.name}`}
      companyItem={companyItem}
    />
  ));
};

const Company: React.FC<ICompanyFC> = ({ company }) => {
  const { data, error } = useSWR("/api/company/", {
    initialData: company,
  });

  if (error)
    return (
      <ErrorMessage message="Список ваших компаний не смог загрузиться...." />
    );

  if (!data) return <LoadingSpinner />;

  return (
    <SCompany>
      <SCompanyTitle>Ваши компании</SCompanyTitle>
      <SCompanyMain>
        {renderCompanyItems(data)}
        <CompanyCreate />
      </SCompanyMain>
    </SCompany>
  );
};

export default Company;
