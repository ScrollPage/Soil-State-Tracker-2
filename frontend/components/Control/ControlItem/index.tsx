import { IDetector } from "@/types/detector";
import { ItemTypes } from "@/utils.ts/items";
import React from "react";
import { useDrag } from "react-dnd";
import { SControlItem, SControlItemText } from "./styles";

export const ControlItem: React.FC<IDetector & { clusterId: number }> = ({
  clusterId,
  id,
  x,
  y,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.Item,
      from: clusterId,
      id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <SControlItem ref={drag} isDragging={isDragging}>
      <SControlItemText>
        <span>id:</span>&nbsp;
        {id}
      </SControlItemText>
      <SControlItemText>
        <span>x:</span>&nbsp;
        {x}
      </SControlItemText>
      <SControlItemText>
        <span>y:</span>&nbsp;
        {y}
      </SControlItemText>
    </SControlItem>
  );
};
