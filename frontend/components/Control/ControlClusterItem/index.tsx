import { IDetector } from "@/types/detector";
import { ItemTypes } from "@/utils.ts/items";
import React, { DragEvent } from "react";
import { useDrop } from "react-dnd";
import { ControlItem } from "../ControlItem";
import {
  SControlClusterItem,
  SControlClusterItemTitle,
  SControlClusterItemBody,
} from "./styles";

const renderControlItems = (detectors: IDetector[]) => {
  return detectors.map((detector) => (
    <ControlItem
      key={`contolItem__key__${detector.id}`}
      id={detector.id}
      x={detector.x}
      y={detector.y}
    />
  ));
};

interface IControlClusterItem {
  detectors: IDetector[];
  title: string;
}

export const ControlClusterItem: React.FC<IControlClusterItem> = ({
  detectors,
  title,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.Item,
    drop: (item, monitor) => console.log(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <SControlClusterItem ref={drop} isOver={isOver} canDrop={canDrop}>
      <SControlClusterItemTitle>{title}</SControlClusterItemTitle>
      <SControlClusterItemBody>
        {renderControlItems(detectors)}
      </SControlClusterItemBody>
    </SControlClusterItem>
  );
};
