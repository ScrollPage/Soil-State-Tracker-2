import { Tooltip } from "antd";
import { IChangeCompanyModalProps } from "@/components/Modal/ChangeCompanyModal";
import { IDeleteCompanyModalProps } from "@/components/Modal/DeleteCompanyModal";
import { SButton } from "@/components/UI/Button";
import { modalShow } from "@/store/actions/modal";
import { ICompany } from "@/types/company";
import { Card } from "antd";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { SCompanyItem, SCompanyItemMain, SCompanyItemBtns, SCompanyItemHeader } from "./styles";

interface ICompanyItemFC {
  companyItem: ICompany;
}

const CompanyItem = ({ companyItem }: ICompanyItemFC) => {
  const dispatch = useDispatch();

  const deleteCompanyHandler = (id: number, name: string) => {
    dispatch(
      modalShow<IDeleteCompanyModalProps>("DELETE_COMPANY_MODAL", {
        id,
        name,
      })
    );
  };

  const changeCompanyHandler = (
    id: number,
    name: string,
    url: string,
    info: string
  ) => {
    dispatch(
      modalShow<IChangeCompanyModalProps>("CHANGE_COMPANY_MODAL", {
        id,
        name,
        url,
        info,
      })
    );
  };

  return (
    <SCompanyItem>
      <SCompanyItemHeader>
        <Tooltip title="Перейти к управлению компанией" color={"blue"}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/control/[ID]" as={`/control/${companyItem.id}`}>
              <a>{companyItem.name}</a>
            </Link>
          </div>
        </Tooltip>
      </SCompanyItemHeader>
      <SCompanyItemMain>
        <p>
          <span>Сайт:</span>&nbsp;
          <a href={companyItem.url}>{companyItem.url}</a>
        </p>
        <p>
          <span>Информация:</span>&nbsp;{companyItem.info}
        </p>
      </SCompanyItemMain>
      <SCompanyItemBtns>
        <SButton
          width={"60%"}
          onClick={() =>
            changeCompanyHandler(
              companyItem.id,
              companyItem.name,
              companyItem.url,
              companyItem.info
            )
          }
        >
          Изменить
        </SButton>
        <SButton
          width={"40%"}
          iswhite={"true"}
          onClick={() => deleteCompanyHandler(companyItem.id, companyItem.name)}
        >
          Удалить
        </SButton>
      </SCompanyItemBtns>
    </SCompanyItem>
  );
};

export default CompanyItem;
