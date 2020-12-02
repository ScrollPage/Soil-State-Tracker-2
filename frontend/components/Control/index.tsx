import { ICompany } from "@/types/company";
import { IDetector } from "@/types/detector";
import { IWorker } from "@/types/user";
import React, { useState } from "react";
import { useContext, createContext } from "react";
import useSWR from "swr";
import ControlSensors from "./ControlSensors";
import ControlUsers from "./ControlUsers";
import { SControl, SControlTitle, SControlMain } from "./styles";

interface IControl {
  companyItem: ICompany;
  detectors: IDetector[] | null;
  workers: IWorker[] | null;
}

// | {
//   companyCheckedList: IDetector[];
//   setCompanyCheckedList: Dispatch<SetStateAction<IDetector[]>>;
// }
// | undefined
const ControlContext = createContext<any>(undefined);

export const useControlContext = () => {
  return useContext(ControlContext);
};

const Control = ({ companyItem, detectors, workers }: IControl) => {
  const [companyCheckedList, setCompanyCheckedList] = useState<IDetector[]>([]);

  console.log(`Детекторы ${JSON.stringify(detectors, null, 2)}`);
  console.log(`Воркеры ${JSON.stringify(workers, null, 2)}`);

  const { data: clientDetectors, error: detectorsError } = useSWR(
    `/api/company/${companyItem.id}/transfer_detectors/`,
    {
      initialData: detectors,
    }
  );

  const { data: clientWorkers, error: workersError } = useSWR(
    `/api/company/${companyItem.id}/workers/`,
    {
      initialData: workers,
    }
  );

  console.log(`Детекторы с клиента ${JSON.stringify(detectors, null, 2)}`);
  console.log(`Воркеры с клиента${JSON.stringify(detectors, null, 2)}`);
  return (
    <SControl>
      <SControlTitle>Управление компанией {companyItem.name}</SControlTitle>
      <SControlMain>
        <ControlContext.Provider
          value={{ companyCheckedList, setCompanyCheckedList }}
        >
          {clientDetectors ? (
            clientDetectors.length !== 0 ? (
              <ControlSensors
                checkedList={companyCheckedList}
                setCheckedList={setCompanyCheckedList}
                companyItem={companyItem}
                detectors={clientDetectors}
              />
            ) : null
          ) : detectorsError ? (
            <h2>Ошибка в выводе детекторов</h2>
          ) : (
            <h2>Загрузка...</h2>
          )}
          {clientWorkers ? (
            clientWorkers.length !== 0 ? (
              <ControlUsers companyItem={companyItem} workers={clientWorkers} />
            ) : null
          ) : workersError ? (
            <h2>Ошибка в выводе детекторов</h2>
          ) : (
            <h2>Загрузка...</h2>
          )}
        </ControlContext.Provider>
      </SControlMain>
    </SControl>
  );
};

export default Control;
