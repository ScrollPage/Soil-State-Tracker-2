import { changeCluster } from "@/store/actions/cluster";
import { ICluster } from "@/types/cluster";
import { ItemTypes } from "@/utils.ts/items";
import React, { memo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import ControlClusterTooltip from "../ControlClusterTooltip";
import RenderControlItems from "../RenderControlItems";
import { SControlClusterItem, SControlClusterItemBody } from "./styles";

const ControlClusterItem: React.FC<ICluster> = ({
  cluster_detectors: detectors,
  name,
  id,
}) => {
  const dispatch = useDispatch();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.Item,
    drop: (item) =>
      // @ts-ignore
      dispatch(changeCluster(item.from, id, item.id)),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <SControlClusterItem ref={drop} isOver={isOver} canDrop={canDrop}>
      <ControlClusterTooltip id={id} name={name} />
      <SControlClusterItemBody>
        <RenderControlItems detectors={detectors} id={id} />
      </SControlClusterItemBody>
    </SControlClusterItem>
  );
};

export default memo(ControlClusterItem);
