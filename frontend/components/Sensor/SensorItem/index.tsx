import { IDetector } from "@/types/detector";
import Checkbox, { CheckboxChangeEvent } from "antd/lib/checkbox";
import React from "react";
import { SSensorItem } from "./styles";

interface ISensorItem {
  detector: IDetector;
  onChange: (e: CheckboxChangeEvent, item: IDetector) => void;
  checked: boolean;
}

const SensorItem = ({ detector, onChange, checked }: ISensorItem) => {
  return (
    <SSensorItem>
      <Checkbox onChange={(e) => onChange(e, detector)} checked={checked}>
        Детектор {detector.id}
      </Checkbox>
    </SSensorItem>
  );
};

export default SensorItem;
