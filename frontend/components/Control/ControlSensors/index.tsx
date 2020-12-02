import { ICompany } from "@/types/company";
import React, { SetStateAction, useState } from "react";
import {
  SControlSensors,
  SControlSensorsMain,
  SControlSensorsHeader,
} from "./styles";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { IDetector } from "@/types/detector";
import SensorItem from "@/components/Sensor/SensorItem";
import { Dispatch } from "react";
import { useEffect } from "react";

interface IControlSensors {
  companyItem: ICompany;
  detectors: IDetector[];
  checkedList?: IDetector[];
  setCheckedList: Dispatch<SetStateAction<IDetector[]>>;
}

const ControlSensors = ({
  companyItem,
  detectors,
  checkedList = [],
  setCheckedList,
}: IControlSensors) => {
  const [indeterminate, setIndeterminate] = useState(
    !!checkedList.length && checkedList.length < detectors.length
  );
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (e: CheckboxChangeEvent, item: IDetector) => {
    let newCheckedList: IDetector[];
    if (e.target.checked) {
      newCheckedList = [...checkedList, item];
    } else {
      newCheckedList = checkedList.filter((p) => p.id !== item.id);
    }
    setCheckedList(newCheckedList);
    setIndeterminate(
      !!newCheckedList.length && newCheckedList.length < detectors.length
    );
    setCheckAll(newCheckedList.length === detectors.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? detectors : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  useEffect(() => {
    if (checkedList.length === 0) {
      setCheckAll(false);
      setIndeterminate(false);
    }
  }, [checkedList]);

  return (
    <SControlSensors>
      {detectors.length !== 0 && (
        <SControlSensorsHeader>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Выбрать все
          </Checkbox>
        </SControlSensorsHeader>
      )}
      <SControlSensorsMain>
        {detectors.map((detector) => (
          <SensorItem
            key={`sensor__key__${detector.id}`}
            onChange={onChange}
            checked={!!checkedList.find((p) => p.id === detector.id)}
            detector={detector}
          />
        ))}
      </SControlSensorsMain>
    </SControlSensors>
  );
};

export default ControlSensors;
