import { SButton } from "@/components/UI/Button";
import { addDetector, removeDetector } from "@/store/actions/detector";
import { ICompany } from "@/types/company";
import { IDetector } from "@/types/detector";
import { IWorker } from "@/types/user";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ControlSensors from "../../ControlSensors";
import { useControlContext } from "../..";
import {
  SControlUser,
  SControlUserTitle,
  SControlUserMain,
  SControlUserArrows,
} from "./styles";
import { Tooltip } from "antd";
import { useWindowSize } from "@/hooks/useWindowSize";

interface IControlUser {
  worker: IWorker;
  companyItem: ICompany;
}

const ControlUser = ({ worker, companyItem }: IControlUser) => {
  const { width } = useWindowSize();

  const [checkedList, setCheckedList] = useState<IDetector[]>([]);
  const { companyCheckedList, setCompanyCheckedList } = useControlContext();

  const dispatch = useDispatch();

  const addDetectorHandler = () => {
    dispatch(addDetector(companyItem.id, worker.id, checkedList));
    setCheckedList([]);
  };

  const removeDetectorsHandler = () => {
    dispatch(removeDetector(companyItem.id, worker.id, companyCheckedList));
    setCompanyCheckedList([]);
  };

  return (
    <SControlUser>
      <SControlUserTitle>{`${worker.first_name} ${worker.last_name}`}</SControlUserTitle>
      <SControlUserMain>
        <SControlUserArrows>
          <Tooltip
            title={`Передать датчики в управление ${worker.first_name} ${worker.last_name}`}
            color={"blue"}
            placement={width && width <= 767 ? "rightTop" : "leftTop"}
          >
            <SButton
              width={"32px"}
              height={"32px"}
              disabled={!!!companyCheckedList.length}
              onClick={removeDetectorsHandler}
            >
              <RightOutlined style={{ fontSize: "20px" }} />
            </SButton>
          </Tooltip>
          {worker.my_detectors.length !== 0 && (
            <Tooltip
              title={`Изъять датчики из управления ${worker.first_name} ${worker.last_name}`}
              color={"blue"}
              placement={width && width <= 767 ? "rightTop" : "leftTop"}
            >
              <SButton
                width={"32px"}
                height={"32px"}
                disabled={!!!checkedList.length}
                onClick={addDetectorHandler}
              >
                <LeftOutlined style={{ fontSize: "20px" }} />
              </SButton>
            </Tooltip>
          )}
        </SControlUserArrows>
        <ControlSensors
          detectors={worker.my_detectors}
          companyItem={companyItem}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
        />
      </SControlUserMain>
    </SControlUser>
  );
};

export default ControlUser;
