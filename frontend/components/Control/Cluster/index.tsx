import { changeCluster } from "@/store/actions/cluster";
import { ICluster } from "@/types/cluster";
import { ItemTypes } from "@/utils.ts/items";
import React, { memo, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { ToolTip } from "../Tooltip";
import { RenderControlItems } from "../RenderControlItems";
import { Wrapper, Main } from "./styles";
import { useSessionState } from "@/hooks/useSessionStorage";
import { useChooseContext } from "@/context/control";

const ClusterComponent: React.FC<ICluster> = ({
  cluster_detectors: detectors,
  name,
  id,
}) => {
  const dispatch = useDispatch();

  const { choose, id: chooseId, kind } = useChooseContext();

  const isChoose = useMemo(() => id === chooseId && kind === "cluster", [
    chooseId,
    kind,
  ]);

  const [showDetectors, setShowDetectors] = useSessionState(
    `showDetectors-with-id-${id}`,
    false
  );

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
    <Wrapper
      ref={drop}
      isOver={isOver}
      canDrop={canDrop}
      isMain={id === 0}
      isChoose={isChoose}
    >
      <ToolTip
        id={id}
        name={name}
        setIsShow={setShowDetectors}
        isShow={showDetectors}
        onChoose={choose}
      />
      <Main>
        {showDetectors && <RenderControlItems detectors={detectors} id={id} />}
      </Main>
    </Wrapper>
  );
};

export const Cluster = memo(ClusterComponent);
