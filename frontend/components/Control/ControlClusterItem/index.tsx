import EmptyMessage from "@/components/UI/EmptyMessage";
import { changeCluster } from "@/store/actions/cluster";
import { ICluster } from "@/types/cluster";
import { IDetector } from "@/types/detector";
import { ItemTypes } from "@/utils.ts/items";
import { Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { ControlItem } from "../ControlItem";
import {
  SControlClusterItem,
  SControlClusterItemTitle,
  SControlClusterItemBody,
} from "./styles";

const renderControlItems = (detectors: IDetector[], id: number) => {
  if (detectors.length === 0) {
    let text = "В данной группе нет детекторов";
    if (id === 0) {
      text = "У вас нет датчиков";
    }
    return <EmptyMessage message={text} />;
  }

  return detectors.map((detector) => (
    <ControlItem
      clusterId={id}
      key={`contolItem__key__${detector.id}`}
      id={detector.id}
      x={detector.x}
      y={detector.y}
    />
  ));
};

export const ControlClusterItem: React.FC<ICluster> = ({
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
      <Tooltip
        title={`Перейти к мониторингу датчиков группы ${name}`}
        color={"blue"}
      >
        <SControlClusterItemTitle>
          <Link href="/control/[ID]" as={`/control/${id}`}>
            <a>{name}</a>
          </Link>
        </SControlClusterItemTitle>
      </Tooltip>
      <SControlClusterItemBody>
        {renderControlItems(detectors, id)}
      </SControlClusterItemBody>
    </SControlClusterItem>
  );
};
