import EmptyMessage from "@/components/UI/EmptyMessage";
import { IDetector } from "@/types/detector";
import React, { memo } from "react";
import ControlItem from "../ControlItem";

interface RenderControlItemsProps {
  detectors: IDetector[];
  id: number;
}

const RenderControlItems: React.FC<RenderControlItemsProps> = ({
  detectors,
  id,
}) => {
  if (detectors.length === 0) {
    let text = "В данной группе нет детекторов";
    if (id === 0) {
      text = "У вас нет датчиков";
    }
    return <EmptyMessage message={text} />;
  }

  return (
    <>
      {detectors.map((detector) => (
        <ControlItem
          key={`contolItem__key__${detector.id}`}
          cluster={detector.cluster}
          clusterId={id}
          id={detector.id}
          x={detector.x}
          y={detector.y}
        />
      ))}
    </>
  );
};

export default memo(RenderControlItems);
