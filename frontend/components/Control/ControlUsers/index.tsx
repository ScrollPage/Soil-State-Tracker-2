import { ICompany } from "@/types/company";
import { IWorker } from "@/types/user";
import React from "react";
import ControlUser from "./ControlUser";
import { SControlUsers } from "./styles";

interface IControlUsers {
  companyItem: ICompany;
  workers: IWorker[];
}

const ControlUsers = ({ companyItem, workers }: IControlUsers) => {
  return (
    <SControlUsers>
      {workers.map((worker) => (
        <ControlUser
          key={`worker__key__${worker.email}`}
          worker={worker}
          companyItem={companyItem}
        />
      ))}
    </SControlUsers>
  );
};

export default ControlUsers;
