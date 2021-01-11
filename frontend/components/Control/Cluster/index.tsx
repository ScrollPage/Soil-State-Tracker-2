import { changeCluster } from "@/store/actions/cluster";
import { ICluster } from "@/types/cluster";
import { ItemTypes } from "@/utils.ts/items";
import React, { memo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { ToolTip } from "../Tooltip";
import { RenderControlItems } from "../RenderControlItems";
import { Wrapper, Main } from "./styles";

const ClusterComponent: React.FC<ICluster> = ({
  cluster_detectors: detectors,
  name,
  id,
}) => {
  const dispatch = useDispatch();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.Item,
    drop: (item) =>
      // @ts-ignore
      dispatch(changeCluster(item.from, id, item.detector)),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Wrapper ref={drop} isOver={isOver} canDrop={canDrop} isMain={id === 0}>
      <ToolTip id={id} name={name} />
      <Main>
        <RenderControlItems detectors={detectors} id={id} />
      </Main>
    </Wrapper>
  );
};

export const Cluster = memo(ClusterComponent);
